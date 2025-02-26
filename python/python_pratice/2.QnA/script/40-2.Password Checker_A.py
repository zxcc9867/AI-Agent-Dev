### 40.Password Checker

# 방법1
while True:
    results = []
    psw = input("Enter password: ")
    
    print()
    
    if not any(i.isdigit() for i in psw):
        results.append("최소 1개 이상의 숫자가 포함되야 해요.")
    if not any(i.isupper() for i in psw):
        results.append("최소 1개 이상의 대문자가 포함되야 해요.")
    if len(psw) < 8:
        results.append("패스워드 길이는 8자 이상 입력해 주세요.")
    if len(results) == 0: # not results
        print("비밀번호 형식이 맞습니다.")
        break
    else:
        print("아래와 같이 비밀번호 조건이 맞지 않습니다.")
        for txt in results:
            print("-->", txt)
            

# 방법2
# 참고 : https://www.geeksforgeeks.org/python-program-check-validity-password/