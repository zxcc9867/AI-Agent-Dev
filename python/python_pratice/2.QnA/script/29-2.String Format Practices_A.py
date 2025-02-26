### 29.String Format Practices

x = 10
y = 20
serialno = 308276567
n = 'Kim'


# 출력1
ex1 = 'n = %s, s = %s, sum=%d' % (n, serialno, (x + y)) # %d
print(ex1)


# 출력2
ex2 = 'n = {n}, s = {serialno}, sum={sum}'.format(n=n, serialno=serialno, sum=x + y)
print(ex2)


# 출력3
ex3 = f'n = {n}, s = {serialno}, sum={x + y}'
print(ex3)


# 출력4
# 보안 취약성 유발 방지
# 출력문을 보다 템플릿 형식으로 정리 및 관리 하고 싶은 경우
from string import Template
ex4 = 'n = $n, s = $serialno, sum=$sum'

t = Template(ex4)

t.substitute(n=n, serialno=serialno, sum=x + y)

print()

# 출력5(다양한 f-string 연습)

# 진수
# (2진수 : b, 8진수 : o, 16진수 : x|X)
k = 77

print(f"k 2: {k:b}, k 8: {k:o}")
print(f"k 16 - l:{k:x}, U:{k:X}")
print()


# 구분기호
m = 10000000000

print(f"m: {m:,}")
print()


# 정렬
# ^ : 가운데 , < : 왼쪽 , > : 오른쪽
g = 20

print(f"g:{g:10}")
print(f"g center: {g:^10}.")
print(f"g left: {g:<10}.")
print(f"g right: {g:>10}.")
print()


# 채우기
print(f"g:{g:-^10}.")
print(f"g:{g:#^10}.")