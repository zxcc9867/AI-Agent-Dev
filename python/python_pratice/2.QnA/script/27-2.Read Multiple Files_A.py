# 27.Read Multiple Files

import os

# 방법1
def read_text_file1(file_path):
    # 결과 리스트
    outputs = []
    
    # iterate through all file
    for file in os.listdir(file_path):
        
        # 파일 리스트 확인
        # print(file)
        
        if file.endswith(".txt"):
            
            target_path = f"{file_path}\{file}"

        with open(target_path, 'r') as f:
            # 내용 확인
            # print(f.read())
            
            outputs.append(f.read().strip('\n')) # .strip('\n')
    
    return outputs

# 실행1
print(read_text_file1("../source/27-1/"))
print()


# 방법2
import glob

def read_text_file2(file_path):
    # 결과 리스트
    outputs = []
    
    for file in glob.glob(file_path + '\*.txt'):
    
        with open(file, 'r') as f:
            # 내용 확인
            # print(f.read())
            
            outputs.append(f.read().strip('\n')) # .strip('\n')
    
    return outputs
            
# 실행2
print(read_text_file2("../source/27-1/"))


# 방법3
# ....