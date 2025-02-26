# 18.Global Variables


# 전역변수 예제1
x = 100

def test1():
    return x * 10

print(f'ex1 결과 : {test1()}')

print()


# 전역변수 예제2
y = 100

def test2():
    global y
    # y = 1000
    y *= 10
    return y

# 실행
print(f'ex2 결과 : {test2()}')