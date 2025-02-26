### 28.Taking Multiple Inputs


# 방법1 
x = int(input("Enter first value: "))
y = int(input("Enter second value: "))
z = int(input("Enter third value: "))

print((x + y + z) / 3) # 총 개수를 카운트 해야함
print()


# 방법2
x, y, z = input("Enter three values: ").split()

print((int(x) + int(y) + int(z)) / 3)
print()


# 방법3
l = list(map(int, input("Enter three values: ").split()))

print(sum(l) / len(l))

# print(round(sum(l) / len(l), 2)) # 자릿수


# 방법4
# ....