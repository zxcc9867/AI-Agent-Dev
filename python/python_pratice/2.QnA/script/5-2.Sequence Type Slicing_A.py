# 5.Sequence Type Slicing
# 슬라이싱, index함수 사용 가능
x = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"]

print(f'결과 1 : {x[4:7]}')
print(f'결과 1 :', x[-9:-6])
print(f'결과 1 :', x[4:-6])
print(f'결과 1 :', x[-9:7])
print(f'결과 1 :', x[4:7:1])
print(f'결과 1 :', x[-9:-6:1])

# 참고
# print('결과 1 : ', x[6:3:-1])
# print('결과 1 : ', list(reversed(x[6:3:-1])))