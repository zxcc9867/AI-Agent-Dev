# 21.String Split By Delimiter

# 예제1
txt1 = "Suppose we have few words that are separated by spaces."

a = txt1.split(" ")

# print(a)
print(f'ex1 결과 : {len(a)}')


# 예제2
txt2 = input() # apple&banana&cherry&orange

b = txt2.split("&") # max 값 조절

# print(b)
print(f'ex2 결과 : {len(b)}')