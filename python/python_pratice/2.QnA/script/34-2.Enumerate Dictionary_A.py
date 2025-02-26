### 34.Enumerate Dictionary

l = ["Red", "Green", "Black", "Blue", "Orange", "Purple"]
        
# 출력1
d1 = dict(enumerate(l)) # tuple 확인

print(d1)


# 출력2
d2 = dict(enumerate(l, start=100))

print(d2)


# 출력3
# ....