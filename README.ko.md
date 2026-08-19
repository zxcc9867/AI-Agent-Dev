# AI Agent 개발 실험실

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)

OpenAI Function Calling, 도구 결과 오케스트레이션, 스트리밍 채팅 UI, 금융 데이터 도구, LangChain 패턴을 직접 실험하는 학습 저장소입니다.

## 포함된 실험

### 타임존 어시스턴트

`function_calling/what_time` 예제는 자연어로 여러 지역의 현재 시간을 조회합니다.

- 터미널 채팅 클라이언트
- Streamlit 채팅 UI
- IANA 타임존을 입력으로 받는 `get_current_time` 도구
- 여러 도구 호출 결과를 대화에 다시 연결하는 흐름

### 금융 어시스턴트

`function_calling/finance` 예제는 OpenAI 도구 호출과 Yahoo Finance 데이터를 결합합니다.

- 기업·시장 정보 조회
- 티커와 기간에 따른 OHLCV 이력
- Streamlit UI
- 스트리밍 응답 예제
- 여러 chunk로 나뉜 tool-call argument 재구성
- 추가 시간대 조회 도구

### LangChain 노트북

`function_calling/langchain` 폴더에는 챗봇과 RAG 패턴을 탐색하는 노트북이 있습니다. 패키징된 운영 제품이 아니라 학습용 실험입니다.

## 기술 스택

- Python 3.8+
- OpenAI Python SDK
- Streamlit
- python-dotenv
- pytz
- yfinance
- pandas
- tabulate
- LangChain notebooks

## 저장소 구조

```text
function_calling/
  what_time/
    gpt_functions.py
    what_time.py
    what_time_stramlit.py
  finance/
    gpt_functions.py
    stock_info_pratice.py
    stock_info_streamlit.py
    stock_info_stream_pratice.py
    yfinance_test.py
  langchain/
    *.ipynb
requirements.txt
```

> `stramlit`, `pratice`처럼 학습 당시의 파일명은 호환성을 위해 그대로 유지합니다.

## 설치

```bash
git clone https://github.com/zxcc9867/AI-Agent-Dev.git
cd AI-Agent-Dev
python -m venv .venv
pip install -r requirements.txt
```

루트에 로컬 `.env`를 만듭니다.

```env
OPENAI_API_KEY=your_openai_api_key
```

실제 키는 커밋하지 않습니다.

## 실행

### 타임존 어시스턴트

```bash
cd function_calling/what_time
python what_time.py
streamlit run what_time_stramlit.py
```

### 금융 어시스턴트

```bash
cd function_calling/finance
streamlit run stock_info_streamlit.py
streamlit run stock_info_stream_pratice.py
```

## Tool Calling 흐름

```text
사용자 요청
  → 모델이 도구와 인자를 선택
  → 애플리케이션이 Python 함수 실행
  → 도구 결과를 대화에 추가
  → 모델이 최종 자연어 답변 생성
```

스트리밍 금융 예제는 index별로 부분 `tool_calls` chunk를 모은 뒤 완전한 JSON 인자를 파싱합니다.

## 제한과 안전

- 소스에 적힌 모델 이름은 공급자 제공 상태에 따라 변경이 필요할 수 있습니다.
- Yahoo Finance 데이터는 지연되거나 불완전할 수 있습니다.
- 금융 예제는 학습 목적이며 투자 조언이 아닙니다.
- 오류 처리와 자동 테스트 범위는 제한적입니다.
- Streamlit 예제는 로컬 학습용이며 공개 운영 서비스로 보안 강화되지 않았습니다.
- 노트북에 따라 추가 패키지가 필요할 수 있습니다.

## 상세 문서

- [타임존 예제](function_calling/what_time/README.md)
- [금융 예제](function_calling/finance/README.md)
