# 4.Sequence Type Indexing
# 슬라이싱, index함수 사용 가능
x = ['Orange', 'Cherry', 'Apple', 'Kiwi', 'Banana', 'Strawberry']

print(f'결과 : {x[4]}')
# print('결과 : ', x.index('Banana')) # 인덱스 확인
# print('결과 : ', 'Banana' in x) # 값 포함 여부 확인
print('결과 :', x[x.index('Banana')])
print('결과 :', x[x.index('Banana', 0, len(x))])