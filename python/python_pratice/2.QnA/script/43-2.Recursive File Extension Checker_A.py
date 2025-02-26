### 43.Recursive File Extension Checker

# 방법1
import os
txt_list1 = []
png_list1 = []

for root, dirnames, filenames in os.walk('../source/43-1'):
    # 확인
    # print(root)
    # print(dirnames)
    # print(filenames)

    for f in filenames:
        ext = f.split(".")[-1]
    
        if ext == 'txt':
            txt_list1.append(f)
    
        if ext == 'png':
            png_list1.append(f)

print('TXT file info : ', txt_list1, " Count : ", len(txt_list1))
print('PNG file info : ', png_list1, " Count : ", len(png_list1))

print()
print()


# 방법2
import glob
 
txt_list2 = glob.glob("../source/43-1/**/*.txt", recursive=True)
png_list2 = glob.glob("../source/43-1/**/*.png", recursive=True)

# 확인
# print(txt_list2)
# print(png_list2)

print('TXT file info : ', txt_list2, " Count : ", len(txt_list2))
print()
print('PNG file info : ', png_list2, " Count : ", len(png_list2))