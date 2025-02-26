# 25.Split Lists into N Chunks

our_list = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

# 방법1
def split_n_list(split_size=3):
    split_list = list()
    
    for i in range(0, len(our_list), split_size):
        # 인덱스 확인
        # print(i, i+split_size)
        
        split_list.append(our_list[i:i+split_size])
        
    return split_list

print('ex1 결과 : ', split_n_list(3))
print()

# 방법2

split_size = 3

output = [our_list[i:i+split_size] for i in range(0, len(our_list), split_size)]

print('ex2 결과 : ', output)

# 방법3
# ....