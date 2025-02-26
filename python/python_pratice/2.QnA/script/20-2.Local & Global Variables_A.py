# 20.Local & Global Variables

def test(x, y):
    global a
    a = 49
    x,y = y,x
    b = 53 # global b 변경 후 테스트
    b = 7
    a = 135
    # 예상1
    print(f'Ex1 결과 : {a, b, x, y}')

a, b, x, y = 8, 13, 33,44 

test(23, 7)

# 예상2
print(f'Ex2 결과 : {a, b, x, y}')