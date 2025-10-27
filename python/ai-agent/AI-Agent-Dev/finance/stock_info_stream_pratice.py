from gpt_functions import (
    get_current_time,
    tools,
    get_yf_stock_info,
    get_yf_stock_history,
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

def tool_list_to_tool_obj(tools):
    """
    tools는 이런식으로 값이 오기 때문에,
    [ChoiceDeltaToolCall(index=0, id='call_Th70EiTyYI0hoUIPvFQSqGvn', function=ChoiceDeltaToolCallFunction(arguments='', name='get_current_time'), type='function'), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='{"', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='timezone', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='":"', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='Asia', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='/M', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='ak', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='assar', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='"}', name=None), type=None)]
    같은 인덱스에 id와 함수이름, arguments가 나눠져서 구성되어있기 때문에,
    하나의 tool_call 오브젝트로 합쳐주는 작업이 필요함
    """
    tool_calls_dict = defaultdict(lambda : {"id":None, "function": {"name":None, "arguments":""},"type":None})

    for tool_call in tools:
        if tool_call.id is not None:
            tool_calls_dict[tool_call.index]["id"] = tool_call.id
        if tool_call.function.name is not None:
            tool_calls_dict[tool_call.index]["function"]["name"] = tool_call.function.name
        tool_calls_dict[tool_call.index]["function"]["arguments"] += tool_call.function.arguments
        if tool_call.type is not None:
            tool_calls_dict[tool_call.index]["type"] = tool_call.type
        # chunck 단위로 오기 때문에, 같은 인덱스에 대해 값을 합쳐줘야 함
    return {"tool_calls": list(tool_calls_dict.values())}
def get_ai_response(messages, tools=None, stream=True):
    response = client.chat.completions.create(
        model="gpt-4o",  # 응답 생성에 사용할 모델 지정
        messages=messages,  # 대화 기록을 입력으로 전달
        tools=tools,  # 사용 가능한 도구 목록 전달
        stream=stream,  # 스트림 모드 설정
    )
    if stream:
        for chunk in response:  # response 값이 chunk단위로 반환됨
            yield chunk
    else:
        return response  # 생성된 응답 내용 반환


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


if user_input := st.chat_input():  # ① 사용자 입력 받기
    st.session_state.messages.append(
        {"role": "user", "content": user_input}
    )  # ① 사용자 메시지를 대화 기록에 추가
    st.chat_message("user").write(user_input)  # ① 사용자 메시지를 브라우저에서도 출력

    ai_response = get_ai_response(st.session_state.messages, tools=tools)
    content = ''
    tool_calls = None
    tool_calls_chunk = []
    with st.chat_message("assistant").empty():# 블록안에 chunk단위로 오는 메시지를 계속해서 출력

        for chunk in ai_response:
            content_chunk=chunk.choices[0].delta.content
            # tool을 호출하지 않았을 때에는 content가 반환
            if content_chunk:
                content += content_chunk
                st.markdown(content)
            # tool 호출이 발생했을 경우, tool_calls에 함수 호출 정보가 담겨 있음
            if chunk.choices[0].delta.tool_calls:                        
                tool_calls_chunk += chunk.choices[0].delta.tool_calls
            """
            tool_calls_chunk의 출력 예시:
            [ChoiceDeltaToolCall(index=0, id='call_Th70EiTyYI0hoUIPvFQSqGvn', function=ChoiceDeltaToolCallFunction(arguments='', name='get_current_time'), type='function'), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='{"', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='timezone', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='":"', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='Asia', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='/M', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='ak', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='assar', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='"}', name=None), type=None)]
            content_chunk: [ChoiceDeltaToolCall(index=0, id='call_Th70EiTyYI0hoUIPvFQSqGvn', function=ChoiceDeltaToolCallFunction(arguments='', name='get_current_time'), type='function'), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='{"', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='timezone', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='":"', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='Asia', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='/M', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='ak', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='assar', name=None), type=None), ChoiceDeltaToolCall(index=0, id=None, function=ChoiceDeltaToolCallFunction(arguments='"}', name=None), type=None)]
            """
            print('content_chunk:', tool_calls_chunk)
            tool_calls_obj = tool_list_to_tool_obj(tool_calls_chunk)
            tool_calls = tool_calls_obj.get("tool_calls", [])
            print('tool_calls obj:', tool_calls)
    print("--------------------------------")
    for tool_call_chunk in tool_calls_chunk:
        print('tool_call_chunk:', tool_call_chunk)

    if tool_calls:  # tool_calls가 있는 경우
        for tool_call in tool_calls:
            tool_name = tool_call.function.name  # 실행해야한다고 판단한 함수명 받기
            tool_call_id = tool_call.id  # tool_call 아이디 받기
            arguments = json.loads(
                tool_call.function.arguments
            )  # (1) 문자열을 딕셔너리로 변환 -> {"timezone": "America/New_York"}' 이런식으로 반환됨
            if (
                tool_name == "get_current_time"
            ):  # ⑤ 만약 tool_name이 "get_current_time"이라면
                st.session_state.messages.append(
                    {
                        "role": "function",  # role을 "function"으로 설정
                        "tool_call_id": tool_call_id,
                        "name": tool_name,
                        "content": get_current_time(
                            timezone=arguments["timezone"]
                        ),  # 타임존 추가
                    }
                )
            elif tool_name == "get_yf_stock_info":
                st.session_state.messages.append(
                    {
                        "role": "function",
                        "tool_call_id": tool_call_id,
                        "name": tool_name,
                        "content": get_yf_stock_info(ticker=arguments["ticker"]),
                    }
                )
            elif tool_name == "get_yf_stock_history":
                st.session_state.messages.append(
                    {
                        "role": "function",
                        "tool_call_id": tool_call_id,
                        "name": tool_name,
                        "content": get_yf_stock_history(
                            ticker=arguments["ticker"], period=arguments["period"]
                        ),
                    }
                )

        st.session_state.messages.append(
            {"role": "system", "content": "이제 주어진 결과를 바탕으로 답변할 차례다."}
        )
        print(f"st.session_state.messages: {st.session_state.messages}")
        ai_response = get_ai_response(
            st.session_state.messages, tools=tools
        )  # 다시 GPT 응답 받기
        print(f"ai response: {ai_response}")
        ai_message = ai_response.choices[0].message

    st.session_state.messages.append(
        {"role": "assistant", "content": content}
    )  # ③ AI 응답을 대화 기록에 추가합니다.

    print("AI\t: " + content)  # AI 응답 출력
    st.chat_message("assistant").write(content)  # 브라우저에 메시지 출력
