# 9.Range & Map & Lambda

# 방법1
ex1 = []
for i in range(1, 16):
    ex1.append(str(i * 10))
    

print(f'ex1 결과 : {ex1}')

# 방법2

print(f'ex2 결과 : {list(map(lambda x : str(x * 10), range(1, 16)))}')


# 방법3

print(f'ex3 결과 : {[str(x * 10) for x in range(1, 16)]}')

# 방법4
# ...