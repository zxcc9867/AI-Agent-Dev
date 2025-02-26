### 36.Progressive Time Delays to Code

import time

# 방법1
for i in [.5, 1, 1.5, 2, 2.5, 3]:
  time.sleep(i)
  print(f"Delayed for {i} seconds")
    

# 방법2
# n = .5
# while True: 
#     time.sleep(n)
#     print(f"Delayed for {n} seconds")
#     n += 0.5

#     if n >= 3.5:
#         break


# # 방법3
# def sleep_out(n=1):
#     print(f"Delayed for {n} seconds")
#     time.sleep(n)

# for n in [.5, 1, 1.5, 2, 2.5, 3]:
#     sleep_out(n)


# 방법4
# ....