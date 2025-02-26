# 8.More Range Technique

# 방법1
ex1 = []
for i in range(1, 21):
    if i % 2 != 0:
        ex1.append(i * 10)
    else:
        ex1.append(i)
    

print(f'ex1 결과 : {ex1}')

# 방법2

print(f'ex2 결과 : {[x * 10 if x % 2 != 0 else x for x in range(1,21) ]}')


# 방법3
# ....

# 응용

# print(f'결과 : {["X" for x in range(1,21) ]}')
# print(f'결과 : {[x for x in range(1,21) if x % 2 != 0]}')
# print(f'결과 : {[[j for j in range(5)] for i in range(5)]}')