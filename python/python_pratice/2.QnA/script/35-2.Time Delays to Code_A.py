### 35.Time Delays to Code

import time

# 방법1
n = 0
while n < 10: 
    n += 1 
    time.sleep(1)
    print(n)
    

# 방법2
# n = 0
# while True: 
#     n += 1 
#     time.sleep(1)
#     print(n)
#     if n == 10:
#         break


# 방법3
# import time
# n = 1
# while True: 
#     time.sleep(1)
#     print(n)
#     n += 1 
#     if n > 10:
#         break


# 방법4
# import time
# n = 1
# while True: 
#     time.sleep(1)
#     if n <= 10:
#         print(n)
#         n += 1 
#         continue
#     break


# 방법5
# ....