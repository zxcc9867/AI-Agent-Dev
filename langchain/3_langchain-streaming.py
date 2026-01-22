# 파이썬 외부 모듈 가져오기 

from langchain_aws import ChatBedrock
from langchain_core.messages import HumanMessage, SystemMessage

# Chatbot 생성 

chat = ChatBedrock(
    model_id="global.anthropic.claude-sonnet-4-5-20250929-v1:0",
    model_kwargs={
        "max_tokens": 1000,
        
    },
    streaming=True  # 스트리밍 옵션 활성화
)

messages= [
    SystemMessage(content="너는 사용자의 질문에 명확히 답변을 하는 챗봇이야."),
    HumanMessage(content="파이썬에서 리스트를 어떻게 정의하나요?")
]

# Stream 형식으로 모델 호출 

for chunk in chat.stream(messages):
    print(chunk.content, end='', flush=True)  # flush는 출력 버퍼를 즉시 비우는 옵션으로, 
    # 파이썬의 print() 함수는 성능을 위해 출력을 버퍼에 모았다가 한꺼번에 출력을 한다. 
    # 하지만, 스트리밍 상황에서는 각 청크가 생성되는 즉시 화면에 표시되어야 하므로, flush=True 옵션을 사용하여 출력 버퍼를 즉시 비우도록 한다.
    
print()  # 마지막에 줄바꿈 추가