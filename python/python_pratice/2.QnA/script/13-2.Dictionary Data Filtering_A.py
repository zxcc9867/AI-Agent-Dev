# 13.Dictionary Data Filtering

d = {'a': 8, 'b': 33, 'c': 15, 'd': 26, 'e': 12, 'f': 120}

# 방법1
ex1 = {}

for k, v in d.items():
    if v >= 25:
        ex1[k] = v
    
print(f'ex1 결과 : {ex1}')


# 방법2
ex2 = {k: v for k, v in d.items() if v >= 20} 
# ex2 = dict(((k, v) for k, v in d.items() if v >= 20))

print(f'ex2 결과 : {ex2}')


# 방법3
ex3 = dict(filter(lambda v: v[1] >= 25, d.items())) # list 바꾸고 확인

print(f'ex2 결과 : {ex3}')


# 방법4
# ....