# 2.Assigning & Comparison

a = 15
b = 25

print(f'결과1 > a == b : {a == b}')
print(f'결과1 > a is b : {a is b}')

print()

c = []
d = c
e = c + d

print(f'결과2 > c == d : {c == d}')
print(f'결과2 > c is d : {c is d}')
print(f'결과2 > c == e : {c == e}')
print(f'결과2 > c is e : {c is e}') # 중요

print()

print(f'c value, id : {c}, {hex(id(c))}')
print(f'd value, id : {d}, {hex(id(d))}')
print(f'c value, id : {e}, {hex(id(e))}')