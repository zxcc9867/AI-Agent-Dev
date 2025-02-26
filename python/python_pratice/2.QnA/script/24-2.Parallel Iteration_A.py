# 24.Parallel Iteration

# 리스트 선언
a = ["one", "two", "three", "four"]
b = [30, 20, 15, 75]
c = [5.2, 7.4, 3.6, 4.2]


# 방법1
result1 = {}
for x, y, z in zip(a,b,c):
    result1[x] = y * z
    
print('ex1 결과 : ', result1)


# 방법2
print('ex2 결과 : ', {x : y * z for x, y, z in zip(a,b,c)})


# 방법3
print('ex2 결과 : ', dict(((x, y * z) for x, y, z in zip(a,b,c))))


# 방법4
# ...


# 참고(strict args >= python 3.10)

# print('참고1 : ', list(zip(range(5), range(100)))) # 길이가 다를 경우 짧은 길이에 맞게 선언
# print('참고2 : ', list(zip(range(5), range(100), strict=True))) # 예외 발생