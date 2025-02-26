# 17.Function Arguments

# 예제1
def greet(name, msg="Good morning!", ):
    return "Hi! " + name + ', ' + msg

# 실행
print(f'ex1 결과 : {greet("Kim")}')
print(f'ex1 결과 : {greet("Park", "How do you do?")}')

print()


# 예제2
def add1(a,b=10,c=15):
    return a + b + c

# 실행
print(f'ex2 결과 : {add1(15)}')
print(f'ex2 결과 : {add1(b=100,c=25,a=30)}')

print()


# 예제3
def add2(*d):
    tot = 0
    for i in d:
         tot += i
    return tot


print(f'ex3 결과 : {add2(1, 2)}')
print(f'ex3 결과 : {add2(1, 2, 3, 4, 5, 6)}')
print(f'ex3 결과 : {add2(*(i for i in range(1, 101)))}')

# print(*(i for i in range(1, 101))) # 참고