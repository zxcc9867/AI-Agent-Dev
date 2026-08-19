# AI Agent Development Lab

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)

A hands-on learning repository for OpenAI function calling, tool-result orchestration, streaming chat interfaces, market-data tools, and LangChain experiments.

## What is included

### Timezone assistant

The `function_calling/what_time` examples let users ask for the current time in natural language.

- Terminal chat client.
- Streamlit chat interface.
- `get_current_time` tool with IANA timezone input.
- Multi-tool-call message handling.

### Finance assistant

The `function_calling/finance` examples combine OpenAI tool calling with Yahoo Finance data.

- Company and market information lookup.
- Historical OHLCV data by ticker and period.
- Streamlit interface.
- Streaming-response example.
- Reconstruction of tool-call arguments delivered across streamed chunks.
- Timezone lookup as an additional tool.

### LangChain notebooks

The `function_calling/langchain` folder contains exploratory notebooks for chatbot and RAG patterns. These are learning artifacts rather than a packaged production application.

## Tech stack

- Python 3.8+
- OpenAI Python SDK
- Streamlit
- python-dotenv
- pytz
- yfinance
- pandas
- tabulate
- LangChain notebooks

## Repository structure

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

> Some filenames keep their original learning-stage spelling, such as `stramlit` and `pratice`.

## Setup

```bash
git clone https://github.com/zxcc9867/AI-Agent-Dev.git
cd AI-Agent-Dev
python -m venv .venv
```

Activate the virtual environment, then install dependencies.

```bash
pip install -r requirements.txt
```

Create a local `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
```

Never commit the real key.

## Run the examples

### Timezone assistant

```bash
cd function_calling/what_time
python what_time.py
streamlit run what_time_stramlit.py
```

Example prompt:

```text
What time is it in New York, Seoul, and Tokyo?
```

### Finance assistant

```bash
cd function_calling/finance
streamlit run stock_info_streamlit.py
streamlit run stock_info_stream_pratice.py
```

Example prompt:

```text
Show NVIDIA's price history for the last month.
```

## Tool-calling flow

```text
User request
  → model selects a tool and arguments
  → application executes the Python function
  → tool result is appended to the conversation
  → model produces the final natural-language answer
```

The streaming finance example also collects partial `tool_calls` chunks by index before parsing complete JSON arguments.

## Limitations and safety

- The examples use the model names currently written in the source and may require updates as provider availability changes.
- Yahoo Finance data may be delayed, incomplete, or unavailable.
- The finance examples are educational and do not provide investment advice.
- Error handling and automated tests are limited.
- Streamlit demos are local development examples, not hardened public services.
- Notebooks may require additional packages depending on the experiment.

## Further reading

- [Timezone example documentation](function_calling/what_time/README.md)
- [Finance example documentation](function_calling/finance/README.md)
