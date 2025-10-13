from datetime import datetime
import pytz
import yfinance as yf


def get_current_time(timezone: str = "Asia/Seoul"):
    tz = pytz.timezone(timezone)

    now_timezone = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")
    print(now_timezone)
    return now_timezone


def get_yf_stock_info(ticker: str):
    stock = yf.Ticker(ticker)
    info = stock.info
    print(info)
    return str(info)


def get_yf_stock_history(ticker: str, period: str = "1d"):
    stock = yf.Ticker(ticker)
    history = stock.history(period=period)
    history_md = history.to_markdown()
    print(history_md)
    return history_md


def get_yf_stock_recommendations(ticker: str):
    stock = yf.Ticker(ticker)
    recommendations = stock.recommendations
    recommendations_md = recommendations.to_markdown()
    print(recommendations_md)
    return recommendations_md


tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_time",
            "description": "현재 타임존에 해당하는 날짜와 시간을 가져옵니다.",
            "parameters": {
                "type": "object",
                "properties": {
                    "timezone": {
                        "type": "string",
                        "description": "현재 타임존을 입력하세요.",
                    },
                },
                "required": ["timezone"],  # 필수 파라미터
            },
        },
    },
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
                        "description": "Yahoo Finance 정보를 반환할 종목의 티커를 입력하세요.",
                    },
                    "period": {
                        "type": "string",
                        "description": "Yahoo Finance 정보를 반환할 종목의 기간을 입력하세요.",
                    },
                },
                "required": ["ticker", "period"],  # 필수 파라미터
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_yf_stock_recommendations",
            "description": "해당 종목의 Yahoo Finance 추천 정보를 가져옵니다.",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {
                        "type": "string",
                        "description": "Yahoo Finance 정보를 반환할 종목의 티커를 입력하세요.",
                    },
                },
                "required": ["ticker"],  # 필수 파라미터
            },
        },
        "required": ["ticker"],  # 필수 파라미터
    },
]

if __name__ == "__main__":
    print(get_yf_stock_history("AAPL", "5d"))
    print("--------------------------------")
    print(get_yf_stock_info("AAPL"))
