# 12.Add Dict Items

d = {'a': 'apple', 'b': 'grape'}

# 방법1
d['c'] = 'banana'
d['d'] = 'kiwi'
    
print(f'ex1 결과 : {d}')

e = {'a': 'apple', 'b': 'grape'}


# 방법2
e.update({'c': 'banana', 'd': 'kiwi'}) # d.update 하면 overwrite

print(f'ex2 결과 : {e}')