# python 외부 모듈 가져오기 

import streamlit as st
from langchain_aws import ChatBedrock
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.messages import AIMessage

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

# 세션에 메시지 설정하기 

if "messages" not in st.session_state: # st.session_state : 세션 상태를 저장하는 딕셔너리이므로, 챗봇은 한번 실행하면, 세션이 유지되지 않는데 
    # st.session으로 메시지를 저장하면, 세션이 유지되는 동안에는 메시지가 유지된다.
    st.session_state.messages = [
        SystemMessage(content="너는 사용자의 질문에 명확히 답변을 하는 챗봇이야."),
    ]
# 메시지를 화면에 출력 

for message in st.session_state.messages:
    if message.type != "system":
        with st.chat_message(message.type): # 시스템메시지가 아닌, 유저와 어시스턴트 메시지만 출력
            st.markdown(message.content)
            
# 체팅 입력란 정의
if prompt := st.chat_input('무엇이든 물어보세요.'):
    # 사용자가 입력한 내용을 대화 기록 (메시지)에 추가 
    st.session_state.messages.append(HumanMessage(content=prompt))
    
    # 사용자의 입력을 화면에 표시 
    with st.chat_message("user"): # with을 통해 chat message 블록 내에서 
        st.markdown(prompt) # 사용자 입력 표시를 하라는 의미 , 마크다운 형식으로 보여줌 
        # with 구문은 html의 div 태그와 유사한 역할을 한다고 보면 된다.
    
    # 챗봇의 응답을 화면에 표시
    with st.chat_message("assistant"):
        response = st.write_stream(chat.stream(st.session_state.messages)) # 스트리밍 응답 표시
        # 챗봇의 응답을 대화 기록(메시지)에 추가 
    print(f'response : {response}')
    # AI의 응답(문자열)을 AIMessage 객체로 변환하여 세션의 대화 기록에 추가
    # 이렇게 저장해야 다음 대화에서 AI가 이전 응답을 기억할 수 있음
    st.session_state.messages.append(AIMessage(content=response)) # response는 문자열이므로, AIMessage 객체로 변환하여 저장