# 📈 Stock Info AI Chatbot

Yahoo Finance 데이터를 활용한 AI 주식 정보 챗봇입니다. OpenAI의 Function Calling 기능을 사용하여 AI가 자동으로 필요한 함수를 호출합니다.

---

## 🎯 핵심 개념: AI가 어떻게 함수를 사용하나요?

### 1️⃣ Function Calling의 동작 원리

AI는 **함수를 직접 실행하지 않습니다**. 대신 다음과 같은 과정으로 동작합니다:

```
사용자: "삼성전자 주가 알려줘"
    ↓
AI: 사용자 의도 분석 → "주식 정보가 필요하구나!"
    ↓
AI: tools 목록을 보고 적절한 함수 선택
    → get_yf_stock_info 함수를 사용하면 되겠다!
    ↓
AI: 함수 호출 요청을 반환 (실제 실행 X)
    {
        "name": "get_yf_stock_info",
        "arguments": {"ticker": "005930.KS"}
    }
    ↓
우리 코드: AI의 요청을 받아서 실제 함수 실행
    result = get_yf_stock_info("005930.KS")
    ↓
우리 코드: 결과를 AI에게 다시 전달
    ↓
AI: 결과를 자연어로 해석하여 답변
    "삼성전자의 현재 주가는 ..."
```

### 2️⃣ 핵심 포인트

✅ **AI는 함수 설명만 보고 판단합니다**

- `tools` 리스트에 정의된 `description`을 읽고 어떤 함수를 사용할지 결정
- 사용자 질문과 함수 설명을 매칭하여 자동 선택

✅ **함수는 우리가 실행합니다**

- AI는 "이 함수를 호출해주세요"라고 요청만 함
- 실제 실행은 `stock_info_streamlit.py`에서 처리

✅ **AI는 결과를 해석합니다**

- 함수 실행 결과(JSON, 문자열 등)를 받아서
- 사용자가 이해하기 쉬운 자연어로 변환

---

## 📁 파일 구조 및 역할

```
finance/
├── gpt_functions.py           # 🔧 함수 정의 및 도구 설명
├── stock_info_streamlit.py    # 🖥️ 메인 챗봇 애플리케이션
├── yfinance_test.py           # 🧪 테스트 스크립트
└── README.md                  # 📖 이 문서
```

---

## 🔧 `gpt_functions.py` - 함수 정의

### 역할

1. **실제 함수 구현**: 주식 정보를 가져오는 Python 함수들
2. **AI용 함수 설명**: AI가 읽을 수 있는 형태로 함수 설명 작성

### 포함된 함수들

#### 1. `get_current_date(timezone)`

```python
def get_current_date(timezone: str = "Asia/Seoul"):
    """현재 시간을 조회하는 함수"""
```

- **용도**: 특정 타임존의 현재 날짜/시간 반환
- **AI가 호출하는 경우**: "지금 몇 시야?", "현재 시간 알려줘"

#### 2. `get_yf_stock_info(ticker)`

```python
def get_yf_stock_info(ticker: str):
    """주식의 기본 정보를 조회하는 함수"""
```

- **용도**: 주식의 상세 정보 (회사명, 시가총액, 섹터 등)
- **AI가 호출하는 경우**: "삼성전자 정보 알려줘"

#### 3. `get_yf_stock_history(ticker, period)`

```python
def get_yf_stock_history(ticker: str, period: str = "1d"):
    """주식의 과거 데이터를 조회하는 함수"""
```

- **용도**: 주식의 과거 가격 데이터 (Open, High, Low, Close)
- **AI가 호출하는 경우**: "애플 최근 5일 차트 보여줘"
- **period 예시**: "1d", "5d", "1mo", "1y"

#### 4. `get_yf_recommendations(ticker)`

```python
def get_yf_recommendations(ticker: str):
    """주식의 애널리스트 추천 정보를 조회하는 함수"""
```

- **용도**: 애널리스트들의 매수/매도 추천 정보
- **AI가 호출하는 경우**: "테슬라 추천 정보 알려줘"

### `tools` 리스트 - AI가 읽는 설명서

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_yf_stock_info",  # 함수 이름
            "description": "해당 종목의 Yahoo Finance 정보를 가져옵니다.",  # AI가 읽는 설명
            "parameters": {  # AI가 전달해야 할 인자들
                "type": "object",
                "properties": {
                    "ticker": {
                        "type": "string",
                        "description": "종목의 티커를 입력하세요."
                    }
                },
                "required": ["ticker"]  # 필수 인자
            }
        }
    },
    # ... 다른 함수들
]
```

**💡 이게 핵심입니다!**

- AI는 `tools` 리스트만 보고 어떤 함수를 사용할지 판단
- `description`이 명확할수록 AI가 정확하게 선택
- `parameters`를 보고 어떤 값을 전달해야 하는지 파악

---

## 🖥️ `stock_info_streamlit.py` - 메인 애플리케이션

### 전체 동작 흐름

```
┌─────────────────────────────────────────────────────┐
│ 1. 사용자가 "삼성전자 주가 알려줘" 입력             │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 2. messages에 user 메시지 추가                      │
│    messages = [                                      │
│        {"role": "system", "content": "..."},         │
│        {"role": "user", "content": "삼성전자 ..."}   │
│    ]                                                 │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 3. AI에게 messages + tools 전달                     │
│    ai_response = get_ai_response(messages, tools)    │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 4. AI가 응답 (tool_calls 포함)                      │
│    {                                                 │
│        "tool_calls": [                               │
│            {                                         │
│                "function": {                         │
│                    "name": "get_yf_stock_info",      │
│                    "arguments": '{"ticker": "..."}'  │
│                }                                     │
│            }                                         │
│        ]                                             │
│    }                                                 │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 5. 우리 코드가 실제 함수 실행                       │
│    result = get_yf_stock_info("005930.KS")          │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 6. 결과를 messages에 추가                           │
│    messages.append({                                 │
│        "role": "function",                           │
│        "name": "get_yf_stock_info",                  │
│        "content": result                             │
│    })                                                │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 7. AI에게 다시 요청 (함수 결과 포함)                │
│    ai_response = get_ai_response(messages, tools)    │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 8. AI가 자연어로 답변 생성                          │
│    "삼성전자의 현재 주가는 7만원이며..."            │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 9. 화면에 답변 표시                                 │
└─────────────────────────────────────────────────────┘
```

### 핵심 코드 분석

#### 1. AI에게 도구 전달

```python
# line 110
ai_response = get_ai_response(st.session_state.messages, tools=tools)
```

- `tools` 파라미터로 사용 가능한 함수 목록을 AI에게 전달
- AI는 이 목록을 보고 필요한 함수를 선택

#### 2. AI의 함수 호출 요청 확인

```python
# line 117
tool_calls = ai_message.tool_calls

if tool_calls:
    # AI가 함수를 호출하고 싶어함!
```

#### 3. 함수 실행

```python
# line 123-157
for tool_call in tool_calls:
    tool_name = tool_call.function.name  # 함수 이름
    arguments = json.loads(tool_call.function.arguments)  # 인자

    if tool_name == "get_yf_stock_info":
        result = get_yf_stock_info(arguments["ticker"])
    elif tool_name == "get_yf_stock_history":
        result = get_yf_stock_history(arguments["ticker"], arguments["period"])
    # ... 다른 함수들
```

#### 4. 함수 결과를 AI에게 전달

```python
# line 160-167
st.session_state.messages.append({
    "role": "function",  # 함수 결과임을 표시
    "tool_call_id": tool_call_id,
    "name": tool_name,
    "content": result  # 실행 결과
})
```

#### 5. AI가 결과를 해석하여 답변

```python
# line 182
ai_response = get_ai_response(st.session_state.messages, tools=tools)
```

- 이번에는 함수 결과가 포함된 messages를 전달
- AI는 결과를 읽고 자연어로 변환하여 답변

---

## 🧪 `yfinance_test.py` - 테스트 스크립트

간단한 테스트용 파일입니다. `yfinance` 라이브러리가 제대로 동작하는지 확인할 때 사용합니다.

```bash
python yfinance_test.py
```

---

## 🔄 전체 연관성 다이어그램

```
┌───────────────────────────────────────────────────────────────┐
│                  stock_info_streamlit.py                      │
│                    (메인 애플리케이션)                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 1. gpt_functions에서 import                          │    │
│  │    - 실제 함수들 (get_yf_stock_info, ...)           │    │
│  │    - tools 리스트 (AI용 설명서)                     │    │
│  └──────────────────────────────────────────────────────┘    │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 2. 사용자 입력 받기                                  │    │
│  │    "삼성전자 주가 알려줘"                            │    │
│  └──────────────────────────────────────────────────────┘    │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 3. AI에게 요청 (messages + tools)                   │    │
│  │    OpenAI API ────→ AI가 tools 분석                 │    │
│  └──────────────────────────────────────────────────────┘    │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 4. AI가 함수 호출 요청 반환                         │    │
│  │    "get_yf_stock_info를 호출해줘"                   │    │
│  └──────────────────────────────────────────────────────┘    │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 5. 실제 함수 실행                                    │    │
│  │    result = get_yf_stock_info("005930.KS")          │    │
│  │    ────────────────────────────────────────────→     │    │
│  │                  gpt_functions.py 함수 호출          │    │
│  └──────────────────────────────────────────────────────┘    │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 6. 결과를 AI에게 다시 전달                          │    │
│  │    OpenAI API ────→ AI가 결과 해석                  │    │
│  └──────────────────────────────────────────────────────┘    │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 7. AI가 자연어 답변 생성                            │    │
│  │    "삼성전자의 현재 주가는..."                       │    │
│  └──────────────────────────────────────────────────────┘    │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 8. 화면에 표시                                       │    │
│  │    Streamlit UI에 렌더링                            │    │
│  └──────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────┘

           ↑ import                         ↑ 함수 호출
           │                                 │
┌──────────────────────┐          ┌─────────────────────┐
│  gpt_functions.py    │          │   yfinance 라이브러리 │
│                      │          │                     │
│  - 함수 구현         │──────────→  Yahoo Finance에서  │
│  - tools 정의        │  사용      │  데이터 가져오기    │
└──────────────────────┘          └─────────────────────┘
```

---

## 🚀 실행 방법

### 1. 환경 설정

```bash
# 가상환경 활성화 (Windows)
.\venv\Scripts\activate

# 필요한 패키지 설치
pip install streamlit openai yfinance python-dotenv
```

### 2. API 키 설정

`.env` 파일에 OpenAI API 키 추가:

```
OPENAI_API_KEY=your-api-key-here
```

### 3. 앱 실행

```bash
streamlit run finance/stock_info_streamlit.py
```

### 4. 사용 예시

```
사용자: "삼성전자 주가 알려줘"
→ AI가 get_yf_stock_info("005930.KS") 호출

사용자: "애플 최근 일주일 차트 보여줘"
→ AI가 get_yf_stock_history("AAPL", "1wk") 호출

사용자: "테슬라 추천 정보 알려줘"
→ AI가 get_yf_recommendations("TSLA") 호출
```

---

## 💡 AI Function Calling의 장점

### 1. 자동 함수 선택

- 사용자가 "주가 알려줘"라고 하면 AI가 알아서 `get_yf_stock_info` 호출
- 개발자가 일일이 조건문으로 처리할 필요 없음

### 2. 자연어 인터페이스

- 티커 심볼을 몰라도 "삼성전자"라고 하면 AI가 "005930.KS"로 변환
- 사용자 친화적인 대화 가능

### 3. 멀티 턴 대화

- "애플 주가 알려줘" → "삼성전자는?" (이전 대화 기억)
- Session State로 대화 히스토리 유지

### 4. 확장성

- 새로운 함수 추가 시:
  1. `gpt_functions.py`에 함수 구현
  2. `tools` 리스트에 설명 추가
  3. `stock_info_streamlit.py`에 if 문 하나 추가
- AI가 자동으로 새 함수 활용

---

## 🔍 디버깅 팁

### 터미널에서 AI 응답 확인

```python
print(ai_message)  # AI의 전체 응답 확인
print(ai_message.content)  # AI의 텍스트 답변만 확인
```

### Tool Calls 확인

```python
if tool_calls:
    for tool_call in tool_calls:
        print(f"함수: {tool_call.function.name}")
        print(f"인자: {tool_call.function.arguments}")
```

### Session State 확인

```python
st.write(st.session_state.messages)  # 전체 대화 히스토리 확인
```

---

## 📚 추가 학습 자료

- [OpenAI Function Calling 공식 문서](https://platform.openai.com/docs/guides/function-calling)
- [Streamlit Session State 가이드](https://docs.streamlit.io/library/advanced-features/session-state)
- [yfinance 라이브러리 문서](https://pypi.org/project/yfinance/)

---

## ❓ FAQ

### Q1: AI가 잘못된 함수를 호출하면?

**A:** `tools`의 `description`을 더 명확하게 작성하세요. 함수의 용도를 구체적으로 설명할수록 AI가 정확하게 선택합니다.

### Q2: 새로운 함수를 추가하려면?

**A:**

1. `gpt_functions.py`에 함수 구현
2. `tools` 리스트에 설명 추가
3. `stock_info_streamlit.py`의 if-elif 체인에 추가

### Q3: AI가 함수를 호출하지 않고 바로 답변하면?

**A:** AI가 함수가 필요 없다고 판단한 것입니다. "안녕하세요" 같은 일반 대화는 함수 없이 답변합니다.

### Q4: Session State는 왜 사용하나요?

**A:** Streamlit은 매 입력마다 스크립트를 처음부터 재실행합니다. Session State 없이는 대화 히스토리가 사라집니다.

---

**만든이**: AI Agent Development Team  
**최종 수정**: 2025-10-13
