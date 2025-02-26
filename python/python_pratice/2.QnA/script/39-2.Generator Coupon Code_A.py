### 39.Generator Coupon Code

import random
from datetime import datetime

# 다양한 방식으로 프로그래밍 가능

# 중복 제거에 대한 고려
# 1.seed 사용
# 2.set() 사용
# 3.반복문 체크

# 방법1
def generate_coupon_code(n): 
    
    characters = "abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()?"
    
    code_list = []
    
    # python 3.9 이상부터는 seed 사용 확인(None)
    # https://docs.python.org/3/library/random.html#bookkeeping-functions
    random.seed(None) # datetime.now()
    
    for i in range(0, n):
        chosen = random.sample(characters, 6)
        code = "".join(chosen)
        code_list.append(code)
        
    return code_list
     

# 출력
print(generate_coupon_code(5))


# 방법2
# ....