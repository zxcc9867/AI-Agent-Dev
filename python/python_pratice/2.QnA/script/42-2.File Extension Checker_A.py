### 42.File Extension Checker

# 방법1
import os
# files = os.listdir('../source/42-1') 

# 확인
# print(files)

png_list1 = []
py_list1 = []

for f in os.listdir('../source/42-1'):
    # print(f)
    # 확인1
    # print(os.path.splitext(f))
    
    # 확인2
    # print(f.split(".")[1])    
    
    ext = f.split(".")[-1]
    
    if ext == 'png':
        png_list1.append(f)
    
    if ext == 'py':
        py_list1.append(f)

print('PNG file info : ', png_list1, " Counts : ", len(png_list1))
print('PY file info : ', py_list1, " Counts : ", len(py_list1))

print()


# 방법2
import glob
 
png_list2 = glob.glob1("../source/42-1","*.png")
py_list2 = glob.glob1("../source/42-1","*.py")

# 확인
# print(png_list2)
# print(py_list2)

print('PNG file info : ', png_list2, " Counts : ", len(png_list2))
print('PY file info : ', py_list2, " Counts : ", len(py_list2))