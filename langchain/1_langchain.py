# python 외부 모듈 가져오기 

# pip install boto3 langchain langchain-aws langchain-community streamlit python-dateutil
from langchain_aws import ChatBedrock 
from langchain_core.messages import HumanMessage, SystemMessage


# 챗봇 생성 

chat = ChatBedrock(
    model_id ="global.anthropic.claude-sonnet-4-5-20250929-v1:0",
    model_kwargs={
        "max_tokens" : 1000
    }
)

# 메시지 정의 

messages = [
    SystemMessage(content="너는 사용자의 질문에 명확히 답변을 하는 챗봇이야."),
    HumanMessage(content="파이썬에서 리스트를 어떻게 정의하나요?")
]

response = chat.invoke(messages)
print(response.content)