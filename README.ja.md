# AI Agent開発ラボ

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)

OpenAI Function Calling、ツール結果のオーケストレーション、ストリーミングチャットUI、金融データツール、LangChainパターンを実際に試す学習リポジトリです。

## 含まれる実験

### タイムゾーンアシスタント

`function_calling/what_time`では、自然言語から複数地域の現在時刻を取得します。

- ターミナル版チャット
- StreamlitチャットUI
- IANAタイムゾーンを入力とする`get_current_time`ツール
- 複数ツール呼び出しの結果を会話へ戻す処理

### 金融アシスタント

`function_calling/finance`ではOpenAIのツール呼び出しとYahoo Financeデータを組み合わせます。

- 企業・市場情報の取得
- ティッカーと期間を指定したOHLCV履歴
- Streamlit UI
- ストリーミング応答
- 複数chunkに分割されたtool-call引数の再構成
- 追加のタイムゾーン取得ツール

### LangChainノートブック

`function_calling/langchain`にはチャットボットとRAGパターンを試すノートブックがあります。パッケージ化された本番アプリではなく、学習用の実験です。

## 技術スタック

- Python 3.8+
- OpenAI Python SDK
- Streamlit
- python-dotenv
- pytz
- yfinance
- pandas
- tabulate
- LangChain notebooks

## リポジトリ構成

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

> `stramlit`や`pratice`など、学習時のファイル名は互換性のためそのまま残しています。

## セットアップ

```bash
git clone https://github.com/zxcc9867/AI-Agent-Dev.git
cd AI-Agent-Dev
python -m venv .venv
pip install -r requirements.txt
```

ルートにローカル`.env`を作成します。

```env
OPENAI_API_KEY=your_openai_api_key
```

実際のキーはコミットしないでください。

## 実行

### タイムゾーンアシスタント

```bash
cd function_calling/what_time
python what_time.py
streamlit run what_time_stramlit.py
```

### 金融アシスタント

```bash
cd function_calling/finance
streamlit run stock_info_streamlit.py
streamlit run stock_info_stream_pratice.py
```

## Tool Callingの流れ

```text
ユーザーの要求
  → モデルがツールと引数を選択
  → アプリケーションがPython関数を実行
  → ツール結果を会話へ追加
  → モデルが最終回答を生成
```

ストリーミング金融例では、部分的な`tool_calls` chunkをindexごとに結合してから完全なJSON引数を解析します。

## 制限と安全性

- ソースに記載されたモデル名は、プロバイダーの提供状況に応じて更新が必要な場合があります。
- Yahoo Financeデータは遅延、不完全、取得不可となる場合があります。
- 金融例は学習目的であり、投資助言ではありません。
- エラー処理と自動テストの範囲は限定的です。
- Streamlit例はローカル学習用であり、公開運用向けに強化されていません。
- ノートブックによっては追加パッケージが必要です。

## 詳細ドキュメント

- [タイムゾーン例](function_calling/what_time/README.md)
- [金融例](function_calling/finance/README.md)
