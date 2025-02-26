# 22.String Split By Delimiter(Advanced)

# 방법1
def cnt_word1(filepath):
    with open(filepath, 'r') as file:
        txt = file.read()
    txt = txt.replace(",", " ")
    
    # 쉼표 제거 확인
    # print(txt)
    
    txt_list = txt.split(" ")
    
    # 리스트 변환(공백)
    # print(txt_list)
    
    return len(txt_list)

print(f'ex1 결과 : {cnt_word1("../source/22-1.txt")}')


# 방법2

import re

def cnt_word2(filepath):
    with open(filepath, 'r') as file:
        txt = file.read()
    
    # 정규표현식 사용
    txt_list = re.split(" |,", txt)
    
    # 리스트 변환(공백 + 콤마)
    # print(txt_list)
    
    return len(txt_list)

print(f'ex2 결과 : {cnt_word2("../source/22-1.txt")}')