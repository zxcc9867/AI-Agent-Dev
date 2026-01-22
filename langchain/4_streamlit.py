# python 외부 모듈 가져오기 

import streamlit as st
from langchain_aws import ChatBedrock
from langchain_core.messages import HumanMessage, SystemMessage

# 제목 
st.title('bedrock 챗봇')

# ChatBedrock 생성

chat  = ChatBedrock(
    model_id="global.anthropic.claude-sonnet-4-5-20250929-v1:0",
    model_kwargs={
        "max_tokens": 1000
    },
    streaming=True  # 스트리밍 옵션 활성화
)

# 메시지 정의 

messages = [
    SystemMessage(content="너는 사용자의 질문에 명확히 답변을 하는 챗봇이야."),
]

# 채팅 입력란 정의 

if prompt := st.chat_input("무엇이든 물어보세요."): # 할당과 동시에 조건 검사 
    # 사용자가 입력한 내용을 대화 기록 (메시지)에 추가 
    messages.append(HumanMessage(content=prompt))
    
    # 사용자의 입력을 화면에 표시 
    with st.chat_message("user"): # with을 통해 chat message 블록 내에서 
        st.markdown(prompt) # 사용자 입력 표시를 하라는 의미 , 마크다운 형식으로 보여줌 
        # with 구문은 html의 div 태그와 유사한 역할을 한다고 보면 된다.
    
    # st.markdown : 마크다운 형식으로 내용을 표시 
    # st.write : 다양한 형식의 내용을 자동으로 감지하여 표시
    # 타입 자동 판별

    # 문자열이면 → 텍스트

    # 리스트면 → 테이블

    # dict면 → JSON

    # DataFrame → 테이블

    # matplotlib → 그래프
    

    # 챗봇의 응답을 화면에 표시
    with st.chat_message("assistant"):
        st.write_stream(chat.stream(messages)) # 스트리밍 응답 표시
     