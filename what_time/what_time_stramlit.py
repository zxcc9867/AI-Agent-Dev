from gpt_functions import get_current_time, tools
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import streamlit as st

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")  # 환경 변수에서 API 키 가져오기

client = OpenAI(api_key=api_key)  # 오픈AI 클라이언트의 인스턴스 생성


def get_ai_response(messages, tools=None, stream=True):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=tools,
    )
    return response


messages = [{"role": "system", "content": "너는 사용자를 도와주는 상담사야."}]

st.title("AI ChatBot")
# session message에 값이 없다면, 대화가 없는 상태이므로, 초기값을 설정
if "messages" not in st.session_state:
    st.session_state["messages"] = [
        {"role": "system", "content": "너는 사용자를 도와주는 상담사야."}
    ]
# ai, user 메시지를 화면에 표시
for msg in st.session_state.messages:
    if msg["role"] != "system":
        st.chat_message(msg["role"]).write(msg["content"])

if user_input := st.chat_input():
    st.session_state.messages.append(
        {"role": "user", "content": user_input}
    )  # 세션 상태에 사용자 메시지 추가
    print("User\t:", user_input)  # 사용자의 대화 내용 출력
    st.chat_message("user").write(user_input)  # 사용자 메시지 표시

    ai_response = get_ai_response(st.session_state.messages, tools=tools)

    # ai_message에서는 gpt가 함수 (tool)를 호출할 필요가 있다고 판단하면, content에는 None을 반환하고,
    # tool_call 속성에 호출할 함수의 이름과 매개변수를 포함한 객체를 반환함

    ai_message = ai_response.choices[
        0
    ].message  # choice는 객체 , ai는 여러 응답을 생성하므로, 그중에서 첫번째 값을 가져옴
    print("Initial AI message:", ai_message)
    # get_ai_response = ChatCompletion(
    # id='chatcmpl-xxx',
    # model='gpt-4o',
    # choices=[...],      # choices는 객체의 속성(attribute)
    # usage={...},
    # created=1234567890)

    # 어떠한 tool을 요구하는지 확인
    # ai message는
    # ChatCompletionMessage(content=None, refusal=None,
    # role='assistant', annotations=[], audio=None, function_call=None,
    # tool_calls=[ChatCompletionMessageFunctionToolCall(id='call_5y4VqdgPLBdCnKAPIzpvngHP',
    # function=Function(arguments='{}', name='get_current_time'), type='function')])

    # 이런식으로 반환
    # ChatCompletionMessageFunctionToolCall는 인스턴스
    # 인스턴스의 정의된 값에 접근을 하려면 . 을 사용
    # class Person:
    # def __init__(self, name, age):
    #     self.name = name  # name은 속성명
    #     self.age = age    # age는 속성명
    #
    #     person = Person(name='김철수', age=25)
    #
    #     # ✅ 올바른 접근                   ChatCompletionMessageFunctionToolCall
    #     print(person.name)  # '김철수' 출력 -> 와 같이 tool_calls[0].name.function.name 이런식으로 접근
    #     print(person.age)   # 25 출력
    if tool_calls := ai_message.tool_calls:
        # 여러 정보에 대해서 한번에 값을 받을 경우
        # ex. ) 뉴욕, 서울, 도쿄 시간을 알려줘 -> 3번 tool을 호출할 필요가 있음.
        for tool_call in tool_calls:
            print("Tool call requested:", tool_call.function.name)
            tool_name = tool_call.function.name
            tool_call_id = tool_call.id
            # 타임존에 대한 argument는 gpt가 사용자의 입력을 바탕으로, tool의 정의를 보고, 필요한 값을 넣음
            arguments_str = json.loads(
                tool_call.function.arguments
            )  # 이 값을 사용하기 위해 gpt가  반환한 json 형태의 문자열을 딕셔너리로 변경
            print("arguments is :", arguments_str)
            # ai가 호출한 tool을 파악하고, 이를 다시 messages에 추가
            if tool_name == "get_current_time":
                st.session_state.messages.append(
                    {
                        "role": "function",  # 함수 실행 결과 반환
                        "name": tool_name,
                        "content": get_current_time(
                            timezone=arguments_str["timezone"]
                        ),  # 함수 실행 결과를 content로 설정
                        "tool_call_id": tool_call_id,  # id로 어떤 결과가 어떤 요청에 대한 것인지 정확히 매칭
                    }
                )
        st.session_state.messages.append(
            {"role": "system", "content": "이제 주어진 결과를 바탕으로 답변해주세요."}
        )
        ai_reponse = get_ai_response(
            st.session_state.messages
        )  # tool 호출 후, 다시 ai에게 응답 요청. 이때, tool에서 사용할 함수가 없다면 None이 반환되므로, 주의 !
        print("get ai response after tool call:", ai_reponse)
        ai_message = ai_reponse.choices[0].message
    # gpt의 답변을 세션에 추가한다.
    st.session_state.messages.append(
        {
            "role": "assistant",
            "content": ai_message.content,
        }
    )
    print("AI\t:", ai_message.content)  # ai의 대답
    st.chat_message("assistant").write(ai_message.content)  # ai 메시지 표시
