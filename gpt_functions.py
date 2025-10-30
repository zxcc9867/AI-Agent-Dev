from datetime import datetime
import pytz
def get_current_date(timezone:str="Asia/Seoul"):
    tz = pytz.timezone(timezone)

    now_timezone = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")
    print(now_timezone)
    return now_timezone


tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_date",
            "description": "Get the current date and time in the specified timezone",
            "parameters": {
                "type": "object",
                "properties": {
                    "timezone": {"type": "string", "description": "현재 날짜와 시간을 반환할 타임존을 입력하세요."},
                },
                "required": ["timezone"], # 필수 파라미터
            },
        },
    }
]

if __name__ == "__main__":
    print(get_current_date('America/New_York'))
