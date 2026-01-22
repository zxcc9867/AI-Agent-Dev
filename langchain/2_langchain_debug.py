
# 랭체인과 베드록간의 실제 통신 내용을 확인하기 위해 디버깅 기능을 켜는 예제입니다.
from langchain_core.globals import set_debug
from langchain_aws import ChatBedrock 
from langchain_core.messages import HumanMessage, SystemMessage

# 디버깅 기능 켜기 

set_debug(True)

# Chatbedrock 생성 

chat = ChatBedrock(
    model_id ="global.anthropic.claude-sonnet-4-5-20250929-v1:0",
    model_kwargs={
        "max_tokens" : 1000
    }
)

messages = [
    SystemMessage(content="너는 사용자의 질문에 명확히 답변을 하는 챗봇이야."),
    HumanMessage(content="파이썬에서 리스트를 어떻게 정의하나요?")
]

response = chat.invoke(messages)

print(response.content)
