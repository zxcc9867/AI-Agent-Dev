# 6.Sequence Item Selection

x = ["grapes", "mango", "orange", "peach", "apple", "lime", "banana", "cherry", "tomato", "kiwi", "blueberry", "watermelon"]

# 방법1
ex1 = []
for i in range(len(x)):
    if x[i] == 'apple' or x[i] == 'kiwi':
         ex1.append(x[i].upper())
    

print(f'ex1 결과 : {ex1}')

# 방법2
ex2 = list(map(lambda b: b.upper(), filter(lambda a: a == 'apple' or a == 'kiwi', x)))

print(f'ex2 결과 : {ex2}')

# 방법3
ex3 = [a.upper() for a in x if a == 'apple' or a == 'kiwi']

# 방법4
# ....

print(f'ex3 결과 : {ex3}')