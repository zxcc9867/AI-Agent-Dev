# 26.Write Files Loops

import os

filenames = ["A", "B", "C", "D", "F", "G"]
contents1 = ["Python", "JavaScript", "PHP", "Rust", "Solidity", "Assembly"]
contents2 = [["Python", "JavaScript", "PHP", "Rust", "Solidity", "Assembly"], ["Python", "JavaScript", "PHP", "Rust", "Solidity", "Assembly"], ["Python", "JavaScript", "PHP", "Rust", "Solidity", "Assembly"], ["Python", "JavaScript", "PHP", "Rust", "Solidity", "Assembly"], ["Python", "JavaScript", "PHP", "Rust", "Solidity", "Assembly"], ["Python", "JavaScript", "PHP", "Rust", "Solidity", "Assembly"]]


# 방법1
def write_contents1(filepath):
    
    if not os.path.exists(filepath):
        os.makedirs(filepath)
    
    # loop write
    for n, c in zip(filenames, contents1):
        with open(filepath + n + '.txt', "w") as file:
            file.write(c)

# 실행1
write_contents1("../source/23-1/")


# 방법2
def write_contents2(filepath):
    
    if not os.path.exists(filepath):
        os.makedirs(filepath)
    
    # loop writelines
    for n, c in zip(filenames, contents2):
        with open(filepath + n + '.txt', "a") as file: 
            # append 확인 
            # c + '\n' for c in c 실습
            file.writelines(c) 

# 실행2
write_contents2("../source/23-2/")


# 방법3
# ....