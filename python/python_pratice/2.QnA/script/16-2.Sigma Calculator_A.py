# 16.Sigma Calculator

# 방법1
def sigma_sum1(n):    
    tot = 0  
    for i in range(1, n + 1): 
        tot = tot + i
    return tot
    

print(f'ex1 결과 : {sigma_sum1(10)}')


# 방법2
def sigma_sum2(n):
    return n * (n + 1) // 2

print(f'ex2 결과 : {sigma_sum2(10)}')


# 방법3
def sigma_sum3(n):
    return sum(range(n + 1))

print(f'ex3 결과 : {sigma_sum3(10)}')


# 방법4
# ...