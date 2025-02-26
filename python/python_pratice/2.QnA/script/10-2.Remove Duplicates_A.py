# 10.Remove Duplicates

# 방법1
x = ["a", 1, "b", 2, "a", 3, "b", 4, 5, "b"]

ex1 = list(set(x))
    
print(f'ex1 결과 : {ex1}')

# 방법2(순서 유지)

from collections import OrderedDict

ex2 = list(OrderedDict.fromkeys(x))

print(f'ex2 결과 : {ex2}')


# 방법3(순서 유지)

ex3 = []

for i in x:
    if i not in ex3:
        ex3.append(i)
        
print(f'ex3 결과 : {ex3}')

# 방법4

# print(f'ex4 결과 : {[n for idx, n in enumerate(x) if n not in x[:idx]]}')

# 방법5
# ...