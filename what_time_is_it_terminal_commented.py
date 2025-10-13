# ===== 라이브러리 임포트 =====
# 커스텀 함수들 (날짜/시간 관련 기능)
from gpt_functions import get_current_date, tools
# OpenAI API 클라이언트
from openai import OpenAI
# 환경변수 로드 (.env 파일에서 API 키 읽기)
from dotenv import load_dotenv
import os
import json
# Streamlit: 웹 UI 프레임워크
import streamlit as st

# ===== 초기 설정 =====
# .env 파일에서 환경변수 로드 (OPENAI_API_KEY 등)
load_dotenv()
# OpenAI 클라이언트 초기화 (API 키 설정)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# ===== AI 응답 생성 함수 =====
def get_ai_response(messages, tools=None):
    """
    OpenAI GPT 모델에게 메시지를 보내고 응답을 받는 함수

    Args:
        messages: 대화 히스토리 (리스트 형태)
                  예: [{"role": "user", "content": "안녕"}, ...]
        tools: 사용 가능한 함수 도구들 (선택사항)
               AI가 필요 시 호출할 수 있는 함수 목록

    Returns:
        AI의 응답 객체 (메시지, tool_calls 등 포함)
    """
    response = client.chat.completions.create(
        model="gpt-4o",  # 사용할 GPT 모델
        messages=messages,  # 대화 히스토리
        tools=tools  # 사용 가능한 함수 도구들
    )
    return response


# ===== 터미널용 메시지 초기화 (Streamlit과 별개) =====
# 이 변수는 아래 while 루프에서 사용됨 (터미널 기반 대화)
# 주의: 이 변수는 st.session_state.messages와 별개임
messages = [
    {"role": "system", "content": "너는 사용자를 도와주는 상담사야."},
]

# ===== Streamlit UI 설정 =====
# 채팅봇 제목 표시
st.title("Chatbot")

# ===== Streamlit 세션 상태 초기화 =====
# session_state는 브라우저 세션 동안 데이터를 유지하는 딕셔너리
# 페이지가 새로고침되어도 데이터가 사라지지 않음
if "messages" not in st.session_state:
    # 첫 방문 시에만 실행: 시스템 메시지로 초기화
    st.session_state.messages = [
        {"role": "system", "content": "너는 사용자를 도와주는 상담사야."},
    ]

# ===== 기존 대화 히스토리 표시 =====
# 페이지가 재실행될 때마다 저장된 모든 메시지를 화면에 렌더링
#
# Streamlit 동작 방식:
# 1. 사용자가 처음 접속 → 스크립트 실행 → 시스템 메시지만 표시
# 2. 사용자가 메시지 입력 → 스크립트 다시 실행 → 이전 메시지들 + 새 메시지 표시
# 3. 반복...
#
# 이 루프 덕분에 대화 히스토리가 계속 유지되어 보임
for msg in st.session_state.messages:
    # 각 메시지를 채팅 UI로 표시
    # msg["role"]: "user", "assistant", "system" 등
    # msg["content"]: 메시지 내용
    st.chat_message(msg["role"]).markdown(msg["content"])

# ===== 터미널 기반 대화 루프 =====
# 주의: 이 while 루프는 Streamlit과 함께 사용하면 안 됨!
# Streamlit은 이벤트 기반 UI이므로 무한 루프가 UI를 완전히 멈추게 함
# 현재 코드는 Streamlit UI 부분과 터미널 부분이 혼재되어 있어 문제가 있음
while True:
    # ===== 사용자 입력 받기 =====
    # 터미널에서 사용자 입력 받기
    user_input = input("You: ")

    # "exit" 입력 시 프로그램 종료
    if user_input == "exit":
        break

    # 사용자 메시지를 대화 히스토리에 추가
    messages.append({"role": "user", "content": user_input})

    # ===== AI에게 첫 번째 요청 =====
    # 사용자 메시지와 함께 tool 정보를 전달
    ai_response = get_ai_response(messages, tools=tools)
    # 응답에서 메시지 객체 추출
    ai_message = ai_response.choices[0].message

    # ===== Tool Calls 처리 =====
    # AI가 함수를 호출하려고 하는지 확인
    # tool_calls는 AI가 함수를 호출하고 싶을 때만 값이 있음
    tools_calls = ai_message.tool_calls
    print(f"tools_calls: {tools_calls}")

    # AI가 함수를 호출하려고 하는 경우
    if tools_calls:
        # ===== Step 1: AI의 tool_calls 요청을 대화 기록에 추가 =====
        # 이 메시지에는 AI가 어떤 함수를 어떤 인자로 호출하고 싶은지 정보가 들어있음
        # OpenAI API는 이 메시지가 대화 히스토리에 있어야 함
        messages.append(ai_message)

        # ===== Step 2: 모든 tool_calls에 대해 실제로 함수를 실행 =====
        # AI가 여러 함수를 동시에 호출할 수 있으므로 반복문 사용
        for tool_call in tools_calls:
            # 함수 이름 추출 (예: "get_current_date")
            tool_name = tool_call.function.name

            # 함수 호출 ID (AI가 어떤 호출의 결과인지 구분하기 위해)
            tool_call_id = tool_call.id

            # 함수 인자를 JSON 문자열에서 파이썬 딕셔너리로 변환
            # 예: '{"timezone": "Asia/Seoul"}' → {"timezone": "Asia/Seoul"}
            arguments = json.loads(tool_call.function.arguments)

            # 요청된 함수가 "get_current_date"인 경우
            if tool_name == "get_current_date":
                # 실제로 함수를 실행하여 결과 얻기
                # arguments["timezone"]에는 "Asia/Seoul" 같은 값이 들어있음
                result = get_current_date(arguments["timezone"])

                # ===== Step 3: 함수 실행 결과를 대화 히스토리에 추가 =====
                # role이 "tool"인 메시지는 함수의 실행 결과를 나타냄
                #
                # 주의: 여기서는 st.session_state.messages에 추가하고 있는데
                # 터미널 루프에서는 messages에 추가해야 AI가 결과를 볼 수 있음
                # 이 부분이 버그일 가능성이 높음!
                st.session_state.messages.append(
                    {
                        "role": "tool",
                        "content": result,  # 함수 실행 결과 (예: "2025-10-13")
                        "tool_call_id": tool_call_id,  # 어떤 호출에 대한 결과인지 연결
                    }
                )

        # ===== Step 4: AI에게 함수 결과를 바탕으로 답변하라고 지시 =====
        # 추가 시스템 메시지로 AI에게 결과를 해석하여 답변하도록 유도
        #
        # 주의: 여기도 st.session_state.messages에 추가 (messages에 추가해야 함)
        st.session_state.messages.append(
            {"role": "system", "content": "주어진 결과를 바탕으로 답변해주세요."}
        )

        # ===== 중간 단계: Streamlit에 assistant 메시지 추가 =====
        # 이 부분은 Streamlit UI를 위한 것으로 보임
        st.session_state.messages.append({
            "role": "assistant",
            "content": ai_message.content,
        })

        # ===== Step 5: 함수 실행 결과를 포함한 대화로 AI에게 다시 요청 =====
        # 이제 messages에는:
        # 1. 사용자 질문
        # 2. AI의 tool_calls 요청
        # 3. tool 실행 결과 (실제로는 messages에 없고 st.session_state.messages에만 있음!)
        # 4. 시스템 메시지 (결과 바탕으로 답변하라는 지시)
        #
        # AI는 함수 결과를 보고 사용자에게 자연어로 답변함
        ai_response = get_ai_response(messages, tools=tools)
        ai_message = ai_response.choices[0].message

    # ===== AI 응답을 대화 히스토리에 추가 =====
    messages.append(ai_message)

    # ===== AI 응답을 Streamlit UI에 표시 =====
    st.chat_message("assistant").markdown(ai_message.content)

    # ===== AI 응답을 터미널에 출력 =====
    print("AI : " + ai_message.content)


# ===== 현재 코드의 문제점 =====
#
# 1. Streamlit과 터미널 입력이 혼재:
#    - Streamlit은 이벤트 기반 UI인데 while True 루프가 실행되면 UI가 멈춤
#    - input() 함수는 터미널 입력을 받는데, Streamlit UI와 함께 사용할 수 없음
#
# 2. 메시지 히스토리가 두 군데:
#    - messages: 터미널 루프용
#    - st.session_state.messages: Streamlit UI용
#    - 두 개가 동기화되지 않아 혼란 발생
#
# 3. Tool 결과가 잘못된 곳에 저장:
#    - tool 실행 결과를 st.session_state.messages에 추가하는데
#    - AI에게 다시 요청할 때는 messages를 전달함
#    - AI는 tool 결과를 보지 못하고 답변함!
#
# ===== 해결 방법 =====
#
# Streamlit만 사용할 경우:
# 1. while True 루프 제거
# 2. st.chat_input()으로 사용자 입력 받기
# 3. st.session_state.messages만 사용
#
# 터미널만 사용할 경우:
# 1. Streamlit 관련 코드 모두 제거
# 2. messages만 사용
# 3. tool 결과를 messages에 추가
