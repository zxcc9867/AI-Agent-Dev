### 38.Date Time Format By Strftime

from datetime import datetime, timezone

# 타임존 출력
# print(datetime.now(timezone.utc))


# 출력1
print(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))


# 출력2
print(datetime.now().strftime('%Y-%m-%d %H:%M:%S %p %A %B'))


# 출력3
# %T - Current time, equal to % H:% M:% S ,
print(datetime.now().strftime('%A, %B %d, %Y %H:%M:%S')) 


# 출력4
print(datetime.now().strftime('%A, %b %x %r')) # %r, %R 비교


# 출력x
# ....