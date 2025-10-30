# What Time - AI 타임존 챗봇 🕐

OpenAI Function Calling을 활용하여 다양한 타임존의 시간을 자연어로 물어볼 수 있는 대화형 AI 챗봇입니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [파일 구조](#파일-구조)
- [핵심 개념](#핵심-개념)
- [코드 상세 분석](#코드-상세-분석)
- [실행 방법](#실행-방법)

---

## 프로젝트 개요

이 프로젝트는 **OpenAI의 Function Calling** 기능을 학습하기 위한 예제 프로젝트입니다. 사용자가 자연어로 시간을 물어보면, GPT가 적절한 타임존을 판단하여 함수를 호출하고 결과를 반환합니다.

### 예시 대화

```
사용자: 뉴욕 시간 알려줘
AI: (get_current_time 함수 호출 → timezone="America/New_York")
AI: 현재 뉴욕 시간은 2025-10-31 15:30:00 입니다.
```

---

## 주요 기능

✅ **자연어 시간 질의**: "서울 시간", "도쿄 몇 시야?", "LA 지금 몇 시?" 등 자연스러운 질문 가능  
✅ **다중 타임존 지원**: pytz 라이브러리를 통해 전 세계 타임존 지원  
✅ **터미널 버전**: `what_time.py` - 커맨드 라인에서 대화  
✅ **웹 버전**: `what_time_stramlit.py` - Streamlit 웹 인터페이스  
✅ **Function Calling**: GPT가 자동으로 필요한 함수 호출 판단

---

## 파일 구조

```
what_time/
├── gpt_functions.py          # 함수 정의 및 Tool 스키마
├── what_time.py              # 터미널 버전 챗봇
└── what_time_stramlit.py     # Streamlit 웹 버전 챗봇
```

### 파일별 역할

| 파일                    | 역할           | 주요 기능                                                                               |
| ----------------------- | -------------- | --------------------------------------------------------------------------------------- |
| `gpt_functions.py`      | 핵심 함수 정의 | - `get_current_time()`: 타임존별 시간 반환<br>- `tools`: OpenAI Function Calling 스키마 |
| `what_time.py`          | 터미널 챗봇    | - while 루프를 통한 대화<br>- Function Calling 로직 구현                                |
| `what_time_stramlit.py` | 웹 챗봇        | - Streamlit UI<br>- 세션 상태 관리<br>- 대화 기록 표시                                  |

---

## 핵심 개념

### 1. OpenAI Function Calling이란? 🔧

GPT가 **자체적으로 함수를 실행할 수는 없지만**, 어떤 함수를 호출해야 하는지 판단하고 필요한 매개변수를 추출할 수 있습니다.

**동작 흐름:**

```
사용자 → GPT → "get_current_time 호출 필요" →
우리 코드가 함수 실행 → 결과를 GPT에 전달 → GPT가 답변 생성
```

### 2. Tool 스키마 정의

OpenAI에게 "이런 함수를 사용할 수 있어"라고 알려주는 JSON 형식의 정의:

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_time",                    # 함수 이름
            "description": "해당 타임존의 날짜와 시간을 가져옵니다.",  # 설명
            "parameters": {                                 # 매개변수 정의
                "type": "object",
                "properties": {
                    "timezone": {
                        "type": "string",
                    }
                },
                "required": ["timezone"],                  # 필수 매개변수
            },
        },
    }
]
```

### 3. Walrus 연산자 (`:=`)

Python 3.8에서 도입된 대입 표현식:

```python
# 기존 방식
tool_calls = ai_message.tool_calls
if tool_calls:
    # 처리

# Walrus 연산자
if tool_calls := ai_message.tool_calls:  # 대입과 조건 검사를 동시에!
    # 처리
```

### 4. Streamlit Session State

Streamlit은 스크립트가 재실행될 때마다 모든 변수가 초기화됩니다. `st.session_state`는 **재실행 간에도 데이터를 유지**합니다.

```python
# 첫 실행: messages 초기화
if "messages" not in st.session_state:
    st.session_state["messages"] = []

# 이후 재실행: 이전 메시지 유지됨
st.session_state.messages.append(new_message)
```

---

## 코드 상세 분석

### 📄 gpt_functions.py

#### 1. 시간 가져오기 함수

```python
def get_current_time(timezone: str = 'Asia/Seoul') -> str:
    tz = pytz.timezone(timezone)              # pytz로 타임존 객체 생성
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # 현재 시간 포맷팅
    now_timezone = f'{now} ({timezone})'      # 결과 문자열 생성
    return now
```

**핵심 포인트:**

- `pytz.timezone()`: 타임존 객체 생성 (예: "America/New_York")
- `datetime.now()`: 현재 시간 가져오기
- `.strftime()`: 날짜/시간을 문자열로 포맷팅

#### 2. Tool 스키마

```python
tools = [
    {
        "type": "function",                   # 항상 "function"
        "function": {
            "name": "get_current_time",       # 실제 함수 이름과 일치해야 함
            "description": "...",              # GPT가 이 설명을 보고 함수 호출 여부 판단
            "parameters": {                    # JSON Schema 형식
                "type": "object",
                "properties": {
                    "timezone": {              # 매개변수 이름
                        "type": "string",      # 데이터 타입
                    }
                },
                "required": ["timezone"],      # 필수 매개변수 목록
            },
        },
    }
]
```

---

### 📄 what_time.py (터미널 버전)

#### 전체 흐름도

```
┌─────────────────┐
│  사용자 입력     │
└────────┬────────┘
         ↓
┌─────────────────┐
│  GPT에게 전송    │ ← tools 함께 전송
└────────┬────────┘
         ↓
    ┌────────┐
    │ tool_calls  │ 있음?
    └────┬───┘
         ↓
    ┌────────────────┐
    │ 함수 실행       │
    │ get_current_time│
    └────┬───────────┘
         ↓
    ┌────────────────┐
    │ 결과를 GPT에    │
    │ 다시 전송       │
    └────┬───────────┘
         ↓
    ┌────────────────┐
    │ 최종 답변 생성  │
    └────────────────┘
```

#### 핵심 코드 분석

**1. 메시지 루프**

```python
messages = [{'role': 'system', 'content': '너는 사용자를 도와주는 상담사야.'}]

while True:
    user_input = input('사용자\t: ')
    if user_input == 'exit':
        break

    messages.append({'role':'user', 'content':user_input})  # 사용자 메시지 추가
    ai_response = get_ai_response(messages, tools=tools)    # GPT 호출
```

**메시지 구조:**

```python
[
    {"role": "system", "content": "너는..."},        # 시스템 프롬프트
    {"role": "user", "content": "뉴욕 시간?"},      # 사용자 질문
    {"role": "assistant", "content": "..."},         # AI 답변
    {"role": "function", "name": "get_current_time", "content": "2025-10-31..."}  # 함수 결과
]
```

**2. Tool 호출 처리**

```python
ai_message = ai_response.choices[0].message  # 첫 번째 응답 선택

if tool_calls := ai_message.tool_calls:  # Walrus 연산자: 대입 + 조건 검사
    for tool_call in tool_calls:  # 여러 함수 호출 가능 (예: 뉴욕, 서울, 도쿄 동시 질문)
        tool_name = tool_calls[0].function.name           # 함수 이름
        tool_call_id = tool_calls[0].id                   # 고유 ID
        arguments_str = json.loads(tool_calls[0].function.arguments)  # JSON → dict
```

**tool_calls 구조:**

```python
[
    ChatCompletionMessageFunctionToolCall(
        id='call_xxxxx',
        function=Function(
            arguments='{"timezone":"America/New_York"}',  # JSON 문자열!
            name='get_current_time'
        ),
        type='function'
    )
]
```

**3. 함수 실행 및 결과 전달**

```python
if tool_name == 'get_current_time':
    messages.append({
        'role': 'function',                      # 역할: 함수 실행 결과
        'name': tool_name,                       # 함수 이름
        'content': get_current_time(             # 실제 함수 실행!
            timezone=arguments_str['timezone']
        ),
        'tool_call_id': tool_call_id             # 어떤 호출에 대한 결과인지 매칭
    })

messages.append({'role':'system', 'content': '이제 주어진 결과를 바탕으로 답변해주세요.'})
ai_response = get_ai_response(messages, tools=tools)  # 다시 GPT 호출
ai_message = ai_response.choices[0].message
```

**핵심 포인트:**

- `role: "function"`: 함수 실행 결과임을 GPT에게 알림
- `tool_call_id`: 여러 함수 호출 시 결과 매칭을 위한 ID
- 두 번째 GPT 호출: 함수 결과를 받아 최종 답변 생성

---

### 📄 what_time_stramlit.py (웹 버전)

#### Streamlit의 재실행 메커니즘

Streamlit은 사용자 입력이 있을 때마다 **전체 스크립트를 처음부터 다시 실행**합니다.

```python
# 매번 실행됨
st.title("AI ChatBot")

# 첫 실행에만 초기화, 이후는 기존 값 유지
if "messages" not in st.session_state:
    st.session_state["messages"] = [...]

# 매번 실행됨 - 이전 메시지들을 화면에 표시
for msg in st.session_state.messages:
    if msg["role"] != "system":
        st.chat_message(msg["role"]).write(msg["content"])

# 새 입력이 있을 때만 실행
if user_input := st.chat_input():
    # 처리...
    # 스크립트 끝 → 처음부터 다시 실행!
```

#### 핵심 차이점: 터미널 vs 웹

| 항목            | 터미널 버전        | Streamlit 버전              |
| --------------- | ------------------ | --------------------------- |
| **반복 방식**   | `while True:` 루프 | 스크립트 재실행             |
| **상태 관리**   | `messages` 변수    | `st.session_state.messages` |
| **입력**        | `input()`          | `st.chat_input()`           |
| **출력**        | `print()`          | `st.chat_message().write()` |
| **메시지 표시** | 실시간 print       | 매 재실행마다 전체 출력     |

#### UI 관련 핵심 코드

```python
# 이전 대화 표시
for msg in st.session_state.messages:
    if msg["role"] != "system":  # 시스템 메시지는 숨김
        st.chat_message(msg["role"]).write(msg["content"])

# 사용자 입력
if user_input := st.chat_input():
    # 세션에 추가
    st.session_state.messages.append({"role": "user", "content": user_input})

    # 즉시 화면에 표시
    st.chat_message("user").write(user_input)

    # GPT 호출 및 처리...

    # AI 답변 화면에 표시
    st.chat_message("assistant").write(ai_message.content)
```

---

## 실행 방법

### 사전 준비

1. **의존성 설치**

```bash
pip install openai python-dotenv pytz streamlit
```

2. **환경 변수 설정**

`.env` 파일 생성:

```env
OPENAI_API_KEY=your_api_key_here
```

### 실행

**터미널 버전:**

```bash
python what_time.py
```

**웹 버전:**

```bash
streamlit run what_time_stramlit.py
```

### 사용 예시

```
사용자: 뉴욕 지금 몇 시야?
AI: 현재 뉴욕 시간은 2025-10-31 15:30:00 입니다.

사용자: 서울이랑 도쿄 시간도 알려줘
AI: 서울 시간은 2025-11-01 04:30:00이고, 도쿄 시간은 2025-11-01 04:30:00입니다.
```

---

## 학습 포인트 💡

### 1. Function Calling 이해

- GPT가 함수를 직접 실행하는 것이 아님
- 함수 호출이 필요하다고 **판단**하고 매개변수를 추출
- 실제 실행은 우리 코드가 담당

### 2. Tool 스키마의 중요성

- `description`이 명확해야 GPT가 올바르게 판단
- `parameters`는 JSON Schema 형식 준수
- `required` 필드로 필수 매개변수 지정

### 3. 메시지 흐름 관리

```
User → GPT → tool_calls 감지 → 함수 실행 → 결과를 messages에 추가 →
GPT에게 다시 전송 → 최종 답변
```

### 4. Streamlit 재실행 메커니즘

- 매번 전체 스크립트 재실행
- `st.session_state`로 상태 유지
- UI 업데이트는 자동으로 처리

---

## 트러블슈팅 🔧

### Q: "timezone을 찾을 수 없습니다" 에러

A: `pytz.timezone()`에 전달하는 타임존 문자열이 유효한지 확인하세요.

```python
# 올바른 예시
pytz.timezone("America/New_York")
pytz.timezone("Asia/Seoul")

# 잘못된 예시
pytz.timezone("뉴욕")  # 영문 표기 사용해야 함
```

### Q: GPT가 함수를 호출하지 않아요

A: Tool 스키마의 `description`을 더 명확하게 작성하거나, 시스템 프롬프트에 함수 사용을 유도하는 문구를 추가하세요.

### Q: Streamlit에서 대화가 사라져요

A: `st.session_state`에 제대로 저장하고 있는지 확인하세요.

---

## 다음 단계 🚀

이 프로젝트를 확장해보세요:

- [ ] 날씨 정보 API 연동
- [ ] 타임존 변환 기능 추가
- [ ] 여러 도시 시간 비교 테이블
- [ ] 알람 설정 기능

---

**작성일**: 2025-10-31  
**OpenAI API 버전**: gpt-4o  
**Python 버전**: 3.8+
