# 23.Alphabet in a File

# 방법1
def write_alphabet1(filepath):
    # 예외 처리 생략
    with open(filepath, "w") as file:
        for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ': # str은 시퀀스형
            file.write(letter + " ")

print(f'ex1 결과 : {write_alphabet1("../source/23-1.txt")}')


# 방법2
import string

def write_alphabet2(filepath):
    # 예외 처리 생략
    with open(filepath, "w") as file:
        for letter in string.ascii_uppercase: # string.ascii_lowercase 실습
            file.write(letter + "\n") # 줄바꿈

print(f'ex2 결과 : {write_alphabet2("../source/23-2.txt")}') 