from gpt_functions import get_current_date, tools
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import streamlit as st

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def get_ai_response(messages, tools=None):
    response = client.chat.completions.create(
        model="gpt-4o", messages=messages, tools=tools
    )
    return response


messages = [
    {"role": "system", "content": "너는 사용자를 도와주는 상담사야."},
]

st.title("Chatbot")

if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": "너는 사용자를 도와주는 상담사야."},
    ]

# 대화 히스토리 표시 (딕셔너리와 객체 모두 처리)
for msg in st.session_state.messages:
    if msg['role'] == 'assistant' or msg['role'] == 'user':

        # msg가 딕셔너리인 경우와 ChatCompletionMessage 객체인 경우 모두 처리
        if isinstance(msg, dict):
            role = msg["role"]
            content = msg.get("content", "")
        else:
            # ChatCompletionMessage 객체인 경우
            role = msg.role
            content = msg.content if msg.content else ""

        # system 메시지는 화면에 표시하지 않음
        if role != "system" and content:
            st.chat_message(role).write(content)

# 사용자 입력 받기 (while True 제거!)
if user_input := st.chat_input():
    # 사용자 메시지를 세션에 저장
    st.session_state.messages.append({"role": "user", "content": user_input})
    # 사용자 메시지를 화면에 표시
    st.chat_message("user").markdown(user_input)

    # AI에게 첫 번째 요청
    ai_response = get_ai_response(st.session_state.messages, tools=tools)
    ai_message = ai_response.choices[0].message

    # Tool Calls 처리
    tools_calls = ai_message.tool_calls
    print(f"tools_calls: {tools_calls}")

    if tools_calls:
        # AI의 tool_calls 메시지를 대화 기록에 추가 (딕셔너리 형태로 변환)
        st.session_state.messages.append({
            "role": "assistant",
            "content": ai_message.content,
            "tool_calls": ai_message.tool_calls
        })

        # 모든 tool_calls에 대해 실제로 함수 실행
        for tool_call in tools_calls:
            tool_name = tool_call.function.name
            tool_call_id = tool_call.id
            arguments = json.loads(tool_call.function.arguments)

            if tool_name == "get_current_date":
                # 함수 실행
                result = get_current_date(arguments["timezone"])
                # 결과를 세션에 저장
                st.session_state.messages.append(
                    {
                        "role": "tool",
                        "content": result,
                        "tool_call_id": tool_call_id,
                    }
                )

        # AI에게 함수 결과를 바탕으로 답변하라고 지시
        st.session_state.messages.append(
            {"role": "system", "content": "주어진 결과를 바탕으로 답변해주세요."}
        )

        # 함수 실행 결과를 포함하여 AI에게 다시 요청
        ai_response = get_ai_response(st.session_state.messages, tools=tools)
        ai_message = ai_response.choices[0].message

    # AI 응답을 세션에 저장 (딕셔너리 형태로 변환)
    st.session_state.messages.append({
        "role": "assistant",
        "content": ai_message.content
    })
    # AI 응답을 화면에 표시
    st.chat_message("assistant").markdown(ai_message.content)
    print("AI : " + ai_message.content)
