from datetime import datetime
import pytz

def get_current_time(timezone:str = 'Asia/Seoul') -> str:
    tz = pytz.timezone(timezone)
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    now_timezone = f'{now} ({timezone})'
    print(now_timezone)
    print(now)
    return now

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_time",
            "description": "해당 타임존의 날짜와 시간을 가져옵니다.",
            "parameters": {  # 함수의 파라미터
                "type": "object",
                "properties": {
                    "timezone": {
                        "type": "string",
                    }
                },
                "description": "현재 날짜와 시간을 반환할 타임존을 입력하세요",
                "required": ["timezone"],  # 함수의 파라미터에서 반드시 필요한 값을 정의
            },
        },
    }
]
