# LangChain + AWS Bedrock 챗봇 학습 예제

이 디렉토리는 LangChain과 AWS Bedrock을 사용하여 챗봇을 구현하는 방법을 단계별로 학습하는 예제들을 포함합니다.

## 📋 목차
1. [기본 챗봇](#1-기본-챗봇)
2. [디버깅 모드](#2-디버깅-모드)
3. [스트리밍 응답](#3-스트리밍-응답)
4. [Streamlit UI](#4-streamlit-ui)
5. [세션 상태 관리](#5-세션-상태-관리)

---

## 🔧 사전 준비

### 필수 패키지 설치
```bash
pip install boto3 langchain langchain-aws langchain-community streamlit python-dateutil
```

### AWS 자격 증명 설정
AWS Bedrock을 사용하려면 적절한 IAM 권한이 설정된 AWS 자격 증명이 필요합니다.

---

## 1. 기본 챗봇
**파일:** `1_langchain.py`

### 설명
LangChain과 AWS Bedrock을 사용한 가장 기본적인 챗봇 구현입니다.

### 주요 개념
- **ChatBedrock**: AWS Bedrock의 Claude 모델을 LangChain에서 사용할 수 있게 해주는 래퍼 클래스
- **SystemMessage**: AI의 역할과 행동 방식을 정의하는 메시지
- **HumanMessage**: 사용자의 질문이나 입력을 담는 메시지
- **invoke()**: 모델에 메시지를 전달하고 응답을 받는 메서드

### 코드 구조
```python
# 1. 챗봇 객체 생성
chat = ChatBedrock(
    model_id="global.anthropic.claude-sonnet-4-5-20250929-v1:0",
    model_kwargs={"max_tokens": 1000}
)

# 2. 메시지 구성
messages = [
    SystemMessage(content="너는 사용자의 질문에 명확히 답변을 하는 챗봇이야."),
    HumanMessage(content="파이썬에서 리스트를 어떻게 정의하나요?")
]

# 3. 모델 호출 및 응답 출력
response = chat.invoke(messages)
print(response.content)
```

### 실행 방법
```bash
python 1_langchain.py
```

### 예상 출력
```
파이썬에서 리스트는 대괄호 []를 사용하여 정의합니다.
예: my_list = [1, 2, 3, 4, 5]
```

---

## 2. 디버깅 모드
**파일:** `2_langchain_debug.py`

### 설명
LangChain과 Bedrock 간의 실제 통신 내용을 확인할 수 있는 디버깅 기능을 활성화한 예제입니다.

### 주요 개념
- **set_debug(True)**: LangChain의 내부 동작을 상세히 출력하는 디버그 모드
- API 요청/응답의 전체 내용을 확인 가능
- 문제 해결 및 학습에 유용

### 추가된 코드
```python
from langchain_core.globals import set_debug

set_debug(True)  # 디버깅 활성화
```

### 실행 방법
```bash
python 2_langchain_debug.py
```

### 디버그 출력 예시
```
[chain/start] [1:chain:RunnableSequence] Entering Chain run with input: {...}
[llm/start] [1:llm:ChatBedrock] Entering LLM run with input: {...}
[llm/end] [1:llm:ChatBedrock] [2.5s] Exiting LLM run with output: {...}
```

---

## 3. 스트리밍 응답
**파일:** `3_langchain-streaming.py`

### 설명
AI의 응답을 한 번에 받는 대신, 생성되는 즉시 실시간으로 출력하는 스트리밍 방식을 구현한 예제입니다.

### 주요 개념
- **streaming=True**: ChatBedrock 생성 시 스트리밍 모드 활성화
- **stream()**: 응답을 청크(chunk) 단위로 받는 메서드
- **flush=True**: 출력 버퍼를 즉시 비워 실시간 출력 구현

### 코드 구조
```python
# 1. 스트리밍 활성화
chat = ChatBedrock(
    model_id="global.anthropic.claude-sonnet-4-5-20250929-v1:0",
    model_kwargs={"max_tokens": 1000},
    streaming=True  # 스트리밍 옵션
)

# 2. 스트리밍 방식으로 응답 받기
for chunk in chat.stream(messages):
    print(chunk.content, end='', flush=True)
```

### flush=True의 역할
- **기본 동작**: Python의 print()는 성능을 위해 출력을 버퍼에 모았다가 한꺼번에 출력
- **flush=True**: 버퍼를 즉시 비워서 각 청크가 생성되는 즉시 화면에 표시
- **결과**: ChatGPT처럼 글자가 타이핑되는 듯한 효과

### 실행 방법
```bash
python 3_langchain-streaming.py
```

### 출력 차이
```
# 일반 방식 (invoke)
[2초 대기] → 전체 응답이 한 번에 출력

# 스트리밍 방식 (stream)
파이썬에서... 리스트는... 대괄호를... (실시간으로 출력)
```

---

## 4. Streamlit UI
**파일:** `4_streamlit.py`

### 설명
웹 브라우저에서 사용할 수 있는 챗봇 UI를 Streamlit으로 구현한 예제입니다.

### 주요 개념
- **Streamlit**: Python으로 웹 앱을 쉽게 만들 수 있는 프레임워크
- **st.chat_input()**: 채팅 입력창 생성
- **st.chat_message()**: 채팅 메시지 박스 생성
- **Walrus 연산자 (:=)**: 할당과 조건 검사를 동시에 수행

### 코드 구조
```python
# 1. 제목 설정
st.title('bedrock 챗봇')

# 2. 메시지 초기화
messages = [
    SystemMessage(content="너는 사용자의 질문에 명확히 답변을 하는 챗봇이야."),
]

# 3. 사용자 입력 처리
if prompt := st.chat_input("무엇이든 물어보세요."):
    # 메시지 추가
    messages.append(HumanMessage(content=prompt))
    
    # 사용자 메시지 표시
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # AI 응답 표시
    with st.chat_message("assistant"):
        st.write_stream(chat.stream(messages))
```

### Walrus 연산자 (:=) 설명
```python
# 기존 방식
prompt = st.chat_input("무엇이든 물어보세요.")
if prompt:
    # 처리

# Walrus 연산자 사용
if prompt := st.chat_input("무엇이든 물어보세요."):
    # 처리
```
- 할당(`prompt = ...`)과 조건 검사(`if prompt`)를 한 줄로 처리
- 사용자가 입력하면 `prompt`에 저장되고 if 블록 실행
- 입력이 없으면 (빈 문자열) if 블록 건너뜀

### with 구문 설명
```python
with st.chat_message("user"):
    st.markdown(prompt)
```
- HTML의 `<div>` 태그와 유사한 역할
- `st.chat_message("user")` 컨텍스트 안에서 실행되는 모든 코드는 해당 메시지 박스 안에 표시됨
- 블록이 끝나면 자동으로 컨텍스트 종료

### st.markdown vs st.write
- **st.markdown**: 마크다운 형식으로 텍스트 표시 (형식 고정)
- **st.write**: 입력 타입을 자동 판별하여 적절한 형식으로 표시
  - 문자열 → 텍스트
  - 리스트/딕셔너리 → JSON
  - DataFrame → 테이블
  - matplotlib → 그래프

### 실행 방법
```bash
streamlit run 4_streamlit.py
```

### 화면 구성
```
┌─────────────────────────────┐
│   bedrock 챗봇              │
├─────────────────────────────┤
│ 👤 User                     │
│ 파이썬에서 리스트는?        │
├─────────────────────────────┤
│ 🤖 Assistant                │
│ 파이썬에서 리스트는...      │
├─────────────────────────────┤
│ 무엇이든 물어보세요. [입력] │
└─────────────────────────────┘
```

---

## 5. 세션 상태 관리
**파일:** `5_streamlit-session.py`

### 설명
대화 기록을 유지하여 이전 대화 내용을 기억하는 챗봇을 구현한 예제입니다.

### 문제점
Streamlit은 사용자가 입력할 때마다 스크립트를 처음부터 다시 실행합니다. 따라서 일반 변수에 저장한 메시지는 매번 초기화됩니다.

### 해결 방법: st.session_state
- **st.session_state**: 세션 동안 데이터를 유지하는 딕셔너리
- 페이지를 새로고침하거나 브라우저를 닫기 전까지 데이터 유지
- 대화 기록, 사용자 설정 등을 저장하는 데 사용

### 코드 구조
```python
from langchain_core.messages import AIMessage

# 1. 세션 상태 초기화 (최초 1회만 실행)
if "messages" not in st.session_state:
    st.session_state.messages = [
        SystemMessage(content="너는 사용자의 질문에 명확히 답변을 하는 챗봇이야."),
    ]

# 2. 이전 대화 기록 표시
for message in st.session_state.messages:
    if message.type != "system":  # 시스템 메시지는 제외
        with st.chat_message(message.type):  # message.type 사용 ("human", "ai")
            st.markdown(message.content)

# 3. 새 입력 처리
if prompt := st.chat_input('무엇이든 물어보세요.'):
    # 사용자 메시지 추가
    st.session_state.messages.append(HumanMessage(content=prompt))
    
    # 사용자 메시지 표시
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # AI 응답 생성 및 표시
    with st.chat_message("assistant"):
        response = st.write_stream(chat.stream(st.session_state.messages))
    
    # AI 응답을 세션에 저장 (문자열을 AIMessage 객체로 변환)
    st.session_state.messages.append(AIMessage(content=response))
```

### 동작 흐름
```
1. 첫 실행
   └─ st.session_state.messages 생성 (SystemMessage만 포함)

2. 사용자 입력: "안녕"
   ├─ messages에 HumanMessage("안녕") 추가
   ├─ AI 응답 생성 (문자열로 반환)
   └─ messages에 AIMessage(content=응답문자열) 추가

3. 사용자 입력: "날씨는?"
   ├─ 이전 대화 기록 표시 (안녕 → 안녕하세요!)
   ├─ messages에 HumanMessage("날씨는?") 추가
   ├─ 전체 대화 기록을 AI에 전달
   └─ AI가 맥락을 이해하고 응답
```

### 중요 포인트
- **st.chat_message(message.type)**: `message` 객체가 아닌 `message.type` 문자열 사용
- **AIMessage로 변환**: `st.write_stream()`은 문자열을 반환하므로 `AIMessage(content=response)`로 감싸서 저장
- **message.type 값**: "human" (사용자), "ai" (AI), "system" (시스템)

### 세션 상태의 장점
- **대화 맥락 유지**: AI가 이전 대화를 기억하고 연속적인 대화 가능
- **사용자 경험 향상**: 페이지 새로고침 없이 자연스러운 대화
- **데이터 지속성**: 세션 동안 모든 데이터 유지

### 실행 방법
```bash
streamlit run 5_streamlit-session.py
```

### 대화 예시
```
👤 User: 파이썬에서 리스트는 어떻게 만들어?
🤖 Assistant: 대괄호 []를 사용합니다. 예: my_list = [1, 2, 3]

👤 User: 그럼 딕셔너리는?
🤖 Assistant: 중괄호 {}를 사용합니다. 예: my_dict = {"key": "value"}
              (이전 대화를 기억하고 "그럼"이라는 맥락을 이해함)
```

---

## 📚 학습 순서 추천

1. **1_langchain.py** → 기본 개념 이해
2. **2_langchain_debug.py** → 내부 동작 확인
3. **3_langchain-streaming.py** → 스트리밍 방식 학습
4. **4_streamlit.py** → UI 구현 방법 학습
5. **5_streamlit-session.py** → 실전 챗봇 완성

---

## 🔑 핵심 개념 정리

### LangChain 메시지 타입
- **SystemMessage**: AI의 역할 정의 (예: "너는 친절한 챗봇이야")
- **HumanMessage**: 사용자 입력
- **AIMessage**: AI 응답 (자동 생성)

### 응답 방식
- **invoke()**: 전체 응답을 한 번에 반환
- **stream()**: 응답을 청크 단위로 실시간 반환

### Streamlit 핵심 함수
- **st.title()**: 제목 표시
- **st.chat_input()**: 채팅 입력창
- **st.chat_message()**: 메시지 박스 (user/assistant)
- **st.markdown()**: 마크다운 텍스트 표시
- **st.write_stream()**: 스트리밍 응답 표시
- **st.session_state**: 세션 데이터 저장소

---

## 🐛 문제 해결

### AWS 자격 증명 오류
```bash
# AWS CLI 설정
aws configure
```

### 모듈 없음 오류
```bash
pip install boto3 langchain langchain-aws streamlit
```

### Bedrock 모델 접근 오류
- AWS 콘솔에서 Bedrock 모델 액세스 권한 확인
- IAM 정책에 `bedrock:InvokeModel` 권한 추가

---

## 📖 참고 자료

- [LangChain 공식 문서](https://python.langchain.com/)
- [AWS Bedrock 문서](https://docs.aws.amazon.com/bedrock/)
- [Streamlit 공식 문서](https://docs.streamlit.io/)

---

## 💡 추가 학습 아이디어

1. **메모리 추가**: ConversationBufferMemory로 대화 기록 관리
2. **프롬프트 템플릿**: PromptTemplate으로 재사용 가능한 프롬프트 작성
3. **체인 구성**: LLMChain으로 복잡한 작업 자동화
4. **RAG 구현**: 문서 검색 + 생성 결합
5. **에이전트 구축**: 도구를 사용하는 자율 에이전트 만들기
