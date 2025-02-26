# 15. Iterate Dictionary

# 선언
d = dict(one = list(range(1, 11)), two = list(range(11, 23)), three = list(range(23, 37)))

# 방법1
for k, v in d.items():
    print(f'key "{k}" has values {v} -> total : {len(v)}')


# 방법2
# ....