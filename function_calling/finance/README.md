# Finance - AI 주식 정보 챗봇 📈

OpenAI Function Calling과 Yahoo Finance API를 활용하여 주식 정보를 자연어로 물어볼 수 있는 대화형 AI 챗봇입니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [파일 구조](#파일-구조)
- [핵심 개념](#핵심-개념)
- [코드 상세 분석](#코드-상세-분석)
- [실행 방법](#실행-방법)

---

## 프로젝트 개요

이 프로젝트는 **OpenAI Function Calling**과 **yfinance** 라이브러리를 결합하여, 자연어로 주식 정보를 조회할 수 있는 챗봇입니다. 스트리밍 응답을 지원하여 실시간으로 AI의 답변을 확인할 수 있습니다.

### 예시 대화

```
사용자: 엔비디아 최근 한달 주가 알려줘
AI: (get_yf_stock_history 함수 호출 → ticker="NVDA", period="1mo")
AI: 엔비디아(NVDA)의 최근 한 달 주가입니다...
    [주가 데이터 테이블 표시]
```

---

## 주요 기능

✅ **주식 정보 조회**: 실시간 주식 정보 (가격, 시가총액, PER 등)  
✅ **주가 히스토리**: 기간별 주가 데이터 (1일, 5일, 1개월 등)  
✅ **타임존 정보**: 세계 시간 조회 기능  
✅ **스트리밍 응답**: 실시간으로 AI 답변을 타이핑하듯 표시  
✅ **웹 인터페이스**: Streamlit 기반의 직관적인 UI  
✅ **대화 기록 유지**: 세션 상태를 통한 대화 히스토리 관리

---

## 파일 구조

```
finance/
├── gpt_functions.py                # 함수 정의 및 Tool 스키마
├── stock_info_pratice.py          # 기본 버전
├── stock_info_streamlit.py        # Streamlit 기본 버전
├── stock_info_stream_pratice.py   # 스트리밍 버전 (고급)
└── yfinance_test.py               # yfinance 테스트 파일
```

### 파일별 역할

| 파일                           | 역할           | 주요 특징                                                           |
| ------------------------------ | -------------- | ------------------------------------------------------------------- |
| `gpt_functions.py`             | 핵심 함수 모음 | - 시간 조회<br>- 주식 정보<br>- 주가 히스토리<br>- Tool 스키마 정의 |
| `stock_info_streamlit.py`      | 기본 웹 챗봇   | - 일반 응답 모드<br>- 간단한 구조                                   |
| `stock_info_stream_pratice.py` | 고급 웹 챗봇   | - 스트리밍 응답<br>- chunk 처리<br>- 실시간 출력                    |

---

## 핵심 개념

### 1. Yahoo Finance API (yfinance) 📊

yfinance는 Yahoo Finance의 데이터를 Python으로 쉽게 가져올 수 있는 라이브러리입니다.

```python
import yfinance as yf

# 주식 객체 생성
stock = yf.Ticker("AAPL")

# 정보 가져오기
info = stock.info            # 회사 정보 (dict)
history = stock.history()    # 주가 히스토리 (DataFrame)
```

### 2. OpenAI 스트리밍 응답 🌊

일반 응답은 전체 답변이 완성된 후 한 번에 반환되지만, 스트리밍은 **chunk 단위로 실시간**으로 받습니다.

```python
# 일반 응답
response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    stream=False  # 전체 응답을 한 번에
)
content = response.choices[0].message.content

# 스트리밍 응답
response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    stream=True   # chunk 단위로
)
for chunk in response:
    content_chunk = chunk.choices[0].delta.content
    if content_chunk:
        print(content_chunk, end="")  # 실시간 출력
```

### 3. Generator 함수 (`yield`) 🔄

Python의 generator는 함수가 값을 하나씩 생성하여 반환합니다.

```python
def get_ai_response(messages, stream=True):
    response = client.chat.completions.create(...)

    if stream:
        for chunk in response:
            yield chunk  # 하나씩 반환 (generator)
    else:
        return response  # 한 번에 반환
```

**Generator 사용:**

```python
# Generator는 for 루프로 순회
for chunk in get_ai_response(messages, stream=True):
    print(chunk)
```

### 4. defaultdict 📦

`collections.defaultdict`는 키가 없을 때 자동으로 기본값을 생성합니다.

```python
from collections import defaultdict

# 일반 dict
normal_dict = {}
normal_dict[0]["name"] = "test"  # ❌ KeyError!

# defaultdict
tool_calls_dict = defaultdict(lambda: {"id": None, "function": {}})
tool_calls_dict[0]["name"] = "test"  # ✅ 자동으로 키 생성!
```

---

## 코드 상세 분석

### 📄 gpt_functions.py

#### 주요 함수들

**1. 시간 조회 함수**

```python
def get_current_time(timezone: str = "Asia/Seoul"):
    tz = pytz.timezone(timezone)
    now_timezone = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")
    return now_timezone
```

**2. 주식 정보 조회**

```python
def get_yf_stock_info(ticker: str):
    stock = yf.Ticker(ticker)       # 주식 객체 생성
    info = stock.info               # 딕셔너리로 정보 반환
    return str(info)                # 문자열로 변환
```

**반환 데이터 예시:**

```python
{
    'symbol': 'AAPL',
    'shortName': 'Apple Inc.',
    'currentPrice': 175.43,
    'marketCap': 2700000000000,
    'fiftyTwoWeekHigh': 199.62,
    # ... 더 많은 정보
}
```

**3. 주가 히스토리 조회**

```python
def get_yf_stock_history(ticker: str, period: str = "1d"):
    stock = yf.Ticker(ticker)
    history = stock.history(period=period)  # DataFrame 반환
    history_md = history.to_markdown()      # Markdown 테이블로 변환
    return history_md
```

**period 옵션:**

- `"1d"`: 1일
- `"5d"`: 5일
- `"1mo"`: 1개월
- `"3mo"`: 3개월
- `"1y"`: 1년
- `"max"`: 전체 기간

**DataFrame → Markdown 변환:**

```markdown
| Date                | Open | High | Low | Close | Volume |
| ------------------- | ---- | ---- | --- | ----- | ------ |
| 2025-10-31 00:00:00 | 175  | 178  | 174 | 177   | 50M    |
```

#### Tools 스키마

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_yf_stock_history",
            "description": "해당 종목의 Yahoo Finance 데이터를 가져옵니다.",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {
                        "type": "string",
                        "description": "종목의 티커를 입력하세요.",
                    },
                    "period": {
                        "type": "string",
                        "description": "기간을 입력하세요.",
                    },
                },
                "required": ["ticker", "period"],  # 둘 다 필수!
            },
        },
    },
    # ... 더 많은 tools
]
```

---

### 📄 stock_info_stream_pratice.py (스트리밍 버전)

이 파일은 가장 고급 기능을 담고 있으며, 스트리밍 응답 처리를 학습하기에 최적입니다.

#### 전체 흐름도

```
사용자 입력
    ↓
AI 응답 (스트리밍)
    ↓
┌─────────────────┐
│ content_chunk?  │ → 있으면 → 화면에 실시간 출력
└─────────────────┘
    ↓
┌─────────────────┐
│ tool_calls?     │ → 있으면 → chunk 단위로 수집
└─────────────────┘
    ↓
tool_calls_chunk 합치기 (tool_list_to_tool_obj)
    ↓
함수 실행
    ↓
결과를 GPT에 전달
    ↓
최종 답변 (스트리밍)
```

#### 핵심 함수: `tool_list_to_tool_obj()`

**문제 상황:**

스트리밍 모드에서 tool_calls는 chunk 단위로 쪼개져서 옵니다:

```python
[
    ChoiceDeltaToolCall(index=0, id='call_xxx', function=Function(arguments='', name='get_yf_stock_history'), type='function'),
    ChoiceDeltaToolCall(index=0, id=None, function=Function(arguments='{"', name=None), type=None),
    ChoiceDeltaToolCall(index=0, id=None, function=Function(arguments='ticker', name=None), type=None),
    ChoiceDeltaToolCall(index=0, id=None, function=Function(arguments='":"', name=None), type=None),
    ChoiceDeltaToolCall(index=0, id=None, function=Function(arguments='NVDA', name=None), type=None),
    # ... arguments가 조각조각
]
```

**해결 방법:**

```python
def tool_list_to_tool_obj(tools):
    """
    chunk로 쪼개진 tool_calls를 index별로 합쳐서
    완전한 tool_call 객체로 만듭니다.
    """
    tool_calls_dict = defaultdict(
        lambda: {
            "id": None,
            "function": {"name": None, "arguments": ""},
            "type": None
        }
    )

    for tool_call in tools:
        index = tool_call.index  # 같은 index끼리 묶음

        # id가 있으면 저장
        if tool_call.id is not None:
            tool_calls_dict[index]["id"] = tool_call.id

        # 함수 이름이 있으면 저장
        if tool_call.function.name is not None:
            tool_calls_dict[index]["function"]["name"] = tool_call.function.name

        # arguments는 계속 이어 붙임 (중요!)
        tool_calls_dict[index]["function"]["arguments"] += tool_call.function.arguments

        # type이 있으면 저장
        if tool_call.type is not None:
            tool_calls_dict[index]["type"] = tool_call.type

    return {"tool_calls": list(tool_calls_dict.values())}
```

**결과:**

```python
{
    "tool_calls": [
        {
            "id": "call_xxx",
            "function": {
                "name": "get_yf_stock_history",
                "arguments": '{"ticker":"NVDA","period":"1mo"}'  # 완전한 JSON!
            },
            "type": "function"
        }
    ]
}
```

#### 스트리밍 응답 처리

```python
ai_response = get_ai_response(st.session_state.messages, tools=tools)
content = ""
tool_calls = None
tool_calls_chunk = []

with st.chat_message("assistant").empty():
    for chunk in ai_response:  # generator를 순회
        # 1. 텍스트 content 처리
        content_chunk = chunk.choices[0].delta.content
        if content_chunk:
            content += content_chunk
            st.markdown(content)  # 실시간으로 화면에 출력!

        # 2. tool_calls 수집
        if chunk.choices[0].delta.tool_calls:
            tool_calls_chunk += chunk.choices[0].delta.tool_calls
```

**핵심 포인트:**

1. **`.delta` vs `.message`**

   - 일반 모드: `response.choices[0].message.content` (전체)
   - 스트리밍: `chunk.choices[0].delta.content` (부분)

2. **누적 방식**

   ```python
   content = ""
   for chunk in response:
       content += chunk.choices[0].delta.content  # 계속 이어 붙임
       st.markdown(content)  # 전체를 다시 출력 (Streamlit이 자동 업데이트)
   ```

3. **tool_calls는 리스트에 추가**
   ```python
   tool_calls_chunk = []
   if chunk.choices[0].delta.tool_calls:
       tool_calls_chunk += chunk.choices[0].delta.tool_calls  # 리스트 확장
   ```

#### 함수 실행 후 재호출

```python
if tool_calls:  # tool_calls가 있는 경우
    for tool_call in tool_calls:
        tool_name = tool_call['function']['name']
        tool_call_id = tool_call['id']
        arguments = json.loads(tool_call['function']['arguments'])

        # 함수별 분기
        if tool_name == "get_current_time":
            st.session_state.messages.append({
                "role": "function",
                "tool_call_id": tool_call_id,
                "name": tool_name,
                "content": get_current_time(timezone=arguments["timezone"]),
            })
        elif tool_name == "get_yf_stock_history":
            st.session_state.messages.append({
                "role": "function",
                "tool_call_id": tool_call_id,
                "name": tool_name,
                "content": get_yf_stock_history(
                    ticker=arguments["ticker"],
                    period=arguments["period"]
                ),
            })

    # 시스템 메시지 추가
    st.session_state.messages.append({
        "role": "system",
        "content": "이제 주어진 결과를 바탕으로 답변할 차례다."
    })

    # 두 번째 GPT 호출 (함수 결과 반영)
    ai_response = get_ai_response(st.session_state.messages, tools=tools)

    content = ""
    with st.chat_message("assistant").empty():
        for chunk in ai_response:
            content_chunk = chunk.choices[0].delta.content
            if content_chunk:
                content += content_chunk
                st.markdown(content)
```

**메시지 흐름:**

```python
[
    {"role": "system", "content": "상담사야"},
    {"role": "user", "content": "엔비디아 주가"},
    # GPT: tool_calls 반환
    {"role": "function", "name": "get_yf_stock_history", "content": "[주가 데이터]"},
    {"role": "system", "content": "결과를 바탕으로 답변"},
    # GPT: 최종 답변
    {"role": "assistant", "content": "엔비디아 주가는..."}
]
```

---

### 📄 stock_info_streamlit.py (기본 버전)

기본 버전은 스트리밍 없이 일반 응답을 사용합니다.

```python
def get_ai_response(messages, tools=None, stream=True):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=tools,
    )
    return response  # 전체 응답 객체 반환
```

**차이점:**

| 항목                | 기본 버전          | 스트리밍 버전          |
| ------------------- | ------------------ | ---------------------- |
| **응답 방식**       | 한 번에            | chunk 단위             |
| **사용자 경험**     | 대기 시간 존재     | 실시간 타이핑 효과     |
| **코드 복잡도**     | 간단               | 복잡 (chunk 처리 필요) |
| **tool_calls 처리** | 완전한 객체로 받음 | 조각조각 → 합쳐야 함   |

---

## 실행 방법

### 사전 준비

1. **의존성 설치**

```bash
pip install -r requirements.txt
```

또는 개별 설치:

```bash
pip install openai python-dotenv streamlit pytz yfinance pandas tabulate
```

2. **환경 변수 설정**

프로젝트 루트에 `.env` 파일 생성:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 실행

**기본 버전 (간단):**

```bash
cd function_calling/finance
streamlit run stock_info_streamlit.py
```

**스트리밍 버전 (고급):**

```bash
cd function_calling/finance
streamlit run stock_info_stream_pratice.py
```

### 사용 예시

**주식 정보 조회:**

```
사용자: 애플 주식 정보 알려줘
AI: Apple Inc.(AAPL)의 현재 주가는 $175.43이며,
    시가총액은 약 2.7조 달러입니다...
```

**주가 히스토리:**

```
사용자: 테슬라 최근 일주일 주가 보여줘
AI: 테슬라(TSLA)의 최근 일주일 주가입니다:
    [테이블로 주가 데이터 표시]
```

**복합 질의:**

```
사용자: 엔비디아랑 AMD 한달 주가 비교해줘
AI: (두 회사의 주가를 각각 조회)
    엔비디아는 상승세, AMD는 횡보세를 보이고 있습니다...
```

---

## 학습 포인트 💡

### 1. 스트리밍 vs 일반 응답

**스트리밍의 장점:**

- ✅ 실시간 피드백으로 UX 향상
- ✅ ChatGPT와 유사한 타이핑 효과
- ✅ 긴 답변에서 대기 시간 감소

**스트리밍의 단점:**

- ❌ 코드 복잡도 증가
- ❌ chunk 처리 로직 필요
- ❌ tool_calls 조립 과정 필요

### 2. defaultdict 활용

```python
# 일반 dict - KeyError 발생 위험
normal = {}
normal[0]["name"] = "test"  # ❌ KeyError!

# defaultdict - 자동 초기화
from collections import defaultdict
auto = defaultdict(lambda: {"name": None})
auto[0]["name"] = "test"  # ✅ 자동 생성!
```

### 3. Generator 함수

```python
def generate_numbers():
    for i in range(3):
        yield i  # 값을 하나씩 반환

# 사용
for num in generate_numbers():
    print(num)  # 0, 1, 2
```

**특징:**

- 메모리 효율적 (모든 값을 한 번에 저장하지 않음)
- 무한 시퀀스 생성 가능
- 스트리밍에 적합

### 4. Tool 호출 ID 매칭

여러 함수를 동시에 호출할 때 `tool_call_id`로 결과를 매칭:

```python
# 사용자: "뉴욕, 서울, 도쿄 시간 알려줘"

# GPT 응답:
tool_calls = [
    {"id": "call_1", "function": {"name": "get_current_time", "arguments": '{"timezone":"America/New_York"}'}},
    {"id": "call_2", "function": {"name": "get_current_time", "arguments": '{"timezone":"Asia/Seoul"}'}},
    {"id": "call_3", "function": {"name": "get_current_time", "arguments": '{"timezone":"Asia/Tokyo"}'}},
]

# 함수 실행 후 결과:
messages.append({"role": "function", "tool_call_id": "call_1", "content": "2025-10-31 15:00:00"})
messages.append({"role": "function", "tool_call_id": "call_2", "content": "2025-11-01 04:00:00"})
messages.append({"role": "function", "tool_call_id": "call_3", "content": "2025-11-01 04:00:00"})
```

---

## 트러블슈팅 🔧

### Q: yfinance에서 데이터를 못 가져와요

**A:** 인터넷 연결을 확인하고, 티커 심볼이 올바른지 확인하세요.

```python
# 올바른 티커
"AAPL"   # Apple
"TSLA"   # Tesla
"NVDA"   # NVIDIA

# 잘못된 티커
"애플"   # 영문 티커 사용
"tesla"  # 대문자로
```

### Q: 스트리밍 응답이 느려요

**A:** 이는 정상입니다. 네트워크 속도와 GPT 응답 속도에 따라 다릅니다.

### Q: tool_calls가 비어있어요

**A:**

1. Tool 스키마의 `description`이 명확한지 확인
2. 사용자 질의가 함수 호출이 필요한 내용인지 확인
3. 시스템 프롬프트에 함수 사용 유도 문구 추가

### Q: JSON 파싱 에러가 발생해요

**A:** 스트리밍 모드에서 `tool_calls_chunk`를 제대로 합쳤는지 확인하세요.

```python
# ❌ 잘못된 방법 - 개별 chunk 사용
for chunk in tool_calls_chunk:
    arguments = json.loads(chunk.function.arguments)  # 불완전한 JSON!

# ✅ 올바른 방법 - 합친 후 사용
tool_calls_obj = tool_list_to_tool_obj(tool_calls_chunk)
tool_calls = tool_calls_obj.get("tool_calls", [])
for tool_call in tool_calls:
    arguments = json.loads(tool_call["function"]["arguments"])  # 완전한 JSON
```

---

## 확장 아이디어 🚀

이 프로젝트를 더 발전시켜보세요:

### 기능 추가

- [ ] 주식 뉴스 조회 기능
- [ ] 여러 종목 비교 차트
- [ ] 알림 기능 (특정 가격 도달 시)
- [ ] 포트폴리오 관리
- [ ] 기술적 분석 지표 (RSI, MACD 등)

### 고급 기능

- [ ] 음성 입력/출력
- [ ] 차트 시각화 (plotly, matplotlib)
- [ ] PDF 리포트 생성
- [ ] 이메일 알림
- [ ] 다국어 지원

---

## 코드 구조 베스트 프랙티스 📚

### 1. 함수 분리

```python
# ✅ Good: 역할별로 함수 분리
def get_stock_data(ticker):
    """주식 데이터 가져오기"""
    pass

def process_data(data):
    """데이터 처리"""
    pass

def display_result(result):
    """결과 표시"""
    pass
```

### 2. 에러 처리

```python
def get_yf_stock_info(ticker: str):
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        return str(info)
    except Exception as e:
        return f"에러 발생: {str(e)}"
```

### 3. 타입 힌트 사용

```python
def get_current_time(timezone: str = "Asia/Seoul") -> str:
    # 입력과 출력 타입을 명시
    pass
```

---

## 참고 자료 📖

- [OpenAI Function Calling 공식 문서](https://platform.openai.com/docs/guides/function-calling)
- [yfinance 문서](https://pypi.org/project/yfinance/)
- [Streamlit 문서](https://docs.streamlit.io/)
- [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html)

---

**작성일**: 2025-10-31  
**OpenAI API 버전**: gpt-4o  
**Python 버전**: 3.8+  
**주요 라이브러리**: openai, yfinance, streamlit, pytz
