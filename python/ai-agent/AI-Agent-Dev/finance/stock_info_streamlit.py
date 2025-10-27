from gpt_functions import (
    get_current_time,
    tools,
    get_yf_stock_info,
    get_yf_stock_history,
    get_yf_stock_recommendations,
)
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import streamlit as st
from collections import defaultdict

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")  # 환경 변수에서 API 키 가져오기

client = OpenAI(api_key=api_key)  # 오픈AI 클라이언트의 인스턴스 생성


def get_ai_response(messages, tools=None, stream=True):
    response = client.chat.completions.create(
        model="gpt-4o",  # 응답 생성에 사용할 모델을 지정합니다.
        stream=stream,  # (1) 스트리밍 출력을 위해 설정
        messages=messages,  # 대화 기록을 입력으로 전달합니다.
        tools=tools,  # 사용 가능한 도구 목록을 전달합니다.
    )

    if stream:
        for chunk in response:
            yield chunk  # 생성된 응답의 내용을 yield로 순차적으로 반환합니다.
    else:
        return response  # 생성된 응답의 내용을 반환합니다.


def tool_list_to_tool_obj(tools):
    print(f"tools: {tools}")
    tool_calls_dict = defaultdict(
        lambda: {"id": None, "function": {"arguments": "", "name": None}, "type": None}
    )

    for tool_call in tools:
        if tool_call.id is not None:
            tool_calls_dict[tool_call.index]["id"] = tool_call.id
        if tool_call.function.name is not None:
            tool_calls_dict[tool_call.index]["function"][
                "name"
            ] = tool_call.function.name
        tool_calls_dict[tool_call.index]["function"][
            "arguments"
        ] += tool_call.function.arguments
        if tool_call.type is not None:
            tool_calls_dict[tool_call.index]["type"] = tool_call.type
    tool_calls_list = list(tool_calls_dict.values())
    return {"tool_calls": tool_calls_list}


st.title("💬 Chatbot")

if "messages" not in st.session_state:
    st.session_state["messages"] = [
        {
            "role": "system",
            "content": "너는 사용자를 도와주는 상담사야.",
        },  # 초기 시스템 메시지
    ]

for msg in st.session_state.messages:
    if (
        msg["role"] == "assistant" or msg["role"] == "user"
    ):  # assistant 혹은 user 메시지인 경우만
        st.chat_message(msg["role"]).write(msg["content"])


if user_input := st.chat_input():  # 사용자 입력 받기
    st.session_state.messages.append({"role": "user", "content": user_input})
    st.chat_message("user").write(user_input)

    ai_response = get_ai_response(st.session_state.messages, tools=tools)

    content = ""
    tool_calls_chunk = []

    # ===== 1단계: 첫 번째 AI 응답 수집 =====
    for chunk in ai_response:
        content_chunk = chunk.choices[0].delta.content
        if content_chunk:
            print(content_chunk, end="")
            content += content_chunk
        if chunk.choices[0].delta.tool_calls:
            tool_calls_chunk += chunk.choices[0].delta.tool_calls

    print("\n===========")
    print(f"Content: {content}")
    print(f"Tool calls chunk count: {len(tool_calls_chunk)}")
    print("===========")

    # ===== 2단계: Tool Calls 처리 =====
    if len(tool_calls_chunk) > 0:
        tool_obj = tool_list_to_tool_obj(tool_calls_chunk)
        tool_calls = tool_obj["tool_calls"]

        print(f"Tool calls: {tool_calls}")

        for tool_call in tool_calls:
            tool_name = tool_call["function"]["name"]
            tool_call_id = tool_call["id"]
            arguments = json.loads(tool_call["function"]["arguments"])

            print(f"\n🔧 함수 호출: {tool_name}")
            print(f"📥 인자: {arguments}")

            # 함수 실행
            if tool_name == "get_current_time":
                func_result = get_current_time(timezone=arguments["timezone"])
            elif tool_name == "get_yf_stock_info":
                func_result = get_yf_stock_info(ticker=arguments["ticker"])
            elif tool_name == "get_yf_stock_history":
                func_result = get_yf_stock_history(
                    ticker=arguments["ticker"], period=arguments["period"]
                )
            elif tool_name == "get_yf_stock_recommendations":
                func_result = get_yf_stock_recommendations(ticker=arguments["ticker"])

            print(f"✅ 결과 길이: {len(str(func_result))}")

            st.session_state.messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tool_call_id,
                    "name": tool_name,
                    "content": func_result,
                }
            )

        # 시스템 메시지 추가
        st.session_state.messages.append(
            {"role": "system", "content": "이제 주어진 결과를 바탕으로 답변해주세요."}
        )

        # ✅ AI에게 다시 요청 (주석 해제!)
        print("\n🤖 AI에게 함수 결과 기반 답변 요청...")
        ai_response_2 = get_ai_response(st.session_state.messages, tools=tools)

        # 실시간 스트리밍 표시
        content = ""
        with st.chat_message("assistant"):
            message_placeholder = st.empty()
            for chunk in ai_response_2:
                content_chunk = chunk.choices[0].delta.content
                if content_chunk:
                    print(content_chunk, end="")
                    content += content_chunk
                    message_placeholder.markdown(content + "▌")
            message_placeholder.markdown(content)

        print(f"\n✅ AI 최종 응답: {content}\n")

    else:
        # ===== 일반 대화 (tool_calls 없음) =====
        print("\n💬 일반 대화 모드")
        if content:
            st.chat_message("assistant").write(content)
            print(f"✅ AI 응답: {content}\n")
        else:
            error_msg = "응답을 받지 못했습니다."
            st.chat_message("assistant").write(error_msg)
            print(f"⚠️ 경고: {error_msg}\n")

    # ===== 3단계: 세션에 저장 =====
    st.session_state.messages.append({"role": "assistant", "content": content})
