# 11.Dict Items Sum

d = {'a': 17,'b': 114,'c': 247, 'd': 362, 'e': 220, 'f': 728, 'g': -283, 'h': 922}

# 방법1
total = 0
for i in d.values():
    total += i
    
print(f'ex1 결과 : {total}')


# 방법2
print(f'ex2 결과 : {sum(d.values())}')


# 방법3
print(f'ex3 결과 : {sum([d[item] for item in d])}') # 괄호 제외


# 방법4
from functools import reduce

print(f'ex4 결과 : {reduce(lambda x,y:x+y,d.values())}')


# 방법5                
# ...