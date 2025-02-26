# 14. Data Pretty Printer

from urllib import request
import json

response = request.urlopen("https://jsonplaceholder.typicode.com/users")

response_json = response.read()

d = json.loads(response_json)

# 출력 결과1
print(d)

# 줄 바꿈
print()
print()

# 출력 결과2
from pprint import pprint

# 기본 출력
pprint(d)

print()
print()

# depth, indent, width 적용
pprint(d, depth=3, indent=4, width=200)