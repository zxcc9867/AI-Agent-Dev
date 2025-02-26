# 19.Local Variables


# 전역 & 지역 변수 정리
a = 20

def test():
    global a
    
    # 출력 값 이해 필요
    print(f'ex3 결과 : {a}')
    
    a = 35
    
    return a

print(f'ex1 결과 : {a}')

a = 100

print(f'ex2 결과 : {a}')
print(f'ex4 결과 : {test()}')

# 출력 값 이해 필요
print(f'ex5 결과 : {a}')