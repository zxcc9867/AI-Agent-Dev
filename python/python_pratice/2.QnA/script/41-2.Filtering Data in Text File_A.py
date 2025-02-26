### 41.Filtering Data in Text File

# 방법1
def read_text_file1(file_path):
    # 결과 리스트
    value_list = []

    with open(file_path, 'r') as f:
        # 내용 확인
        # print(f.read())
        # print(f.readline())
        # print(f.readlines())
        
        # 한 번에 읽기
        lines = f.readlines()
        
        for line in lines:
            country, value = line.rstrip().split(",") # (",") 비교
            if country.lower().startswith('c'):
                # 특정 문자열로 시작하는 국가 이름이 맞는지 확인
                # print(country)
                value_list.append(int(value))
            
    return value_list

result = read_text_file1("../source/41-1.txt")

print(sum(result))
print()
            

# 방법2
import csv
# 참고 : https://docs.python.org/3/library/csv.html

def read_text_file2(file_path):
    # 결과 리스트
    value_list = []

    with open(file_path, 'r') as f:
        
        # csv 형식 한 번에 읽기
        reader = csv.reader(f, delimiter=',')
        for row in reader:
            # 확인
            # print(row)
            # print(row[0], row[1])
            # print(', '.join(row))
            
            if row[0].lower().startswith('c'):
                # 특정 문자열로 시작하는 국가 이름이 맞는지 확인
                # print(row[0])
                value_list.append(int(row[1]))
            
    return value_list

result = read_text_file2("../source/41-1.txt")

print(sum(result))


# 방법3
# ....