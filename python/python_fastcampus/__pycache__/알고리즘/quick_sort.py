"""

퀵정렬 

"""

import random


def quick_sort(arr):
    # 피벗을 뽑는다.
    # 왼쪽 배열에 피벗보다 작은 값을 담는다.
    # 오른쪽 배열에 피벗보다 큰 값을 담는다.
    # 왼쪽 배열을 대상으로 퀵 정렬을 수행한다.
    # 오른쪽 배열을 대상으로 퀵정렬을 재수행한다.
    # 왼쪽 배열과 오른쪽 배열을 결합한다.

    if len(arr) <= 1:
        return arr

    pivot = random.choice(arr) # 배열에서 숫자를 랜덤하게 하나 뽑아서 
    less = []
    greater = []
    equal = []

    for item in arr:
        if item > pivot: # 랜덤하게 뽑힌 숫자를 기준으로 크면, 
            greater.append(item) # 큰 배열에 넣고 
        elif item < pivot: # 숫자가 작으면, 
            less.append(item) # 작은 배열에 넣고 
        else:
            equal.append(item) # 같으면 같다는 배열에 넣는다. 
    # less, equal , greater 로 배치하고, 각 배열에 대해서 정렬을 수행하고 합치면 전체 정렬이 된다.
    return quick_sort(less) + equal + quick_sort(greater) # 함수를 재귀 호출 


arr = [5, 2, 8, 3, 1, 9, 6, 4, 7]

print(quick_sort(arr))

"""
예를 들어서 숫자 7이 랜덤하게 뽑히면, 


    if len(arr) <= 1:
        return arr

    pivot = random.choice(arr) 1. 숫자 7이 뽑혔다. 5. 8이 뽑혔다. 
    less = []
    greater = []
    equal = []

    for item in arr:
        if item > pivot: 2. 5 > 7을 비교하기 때문에  6. 2 > 8 비교 
            greater.append(item) # 큰 배열에 넣고 
        elif item < pivot: # 
            less.append(item) # 3. 5는 less에 들어간다. 7. 2는 less에 들어간다. 
        else:
            equal.append(item) # 같으면 같다는 배열에 넣는다. 

    4. [5]                               [2,8,3,1,9,6,4]
    8.[5,2]                              [3,1,9,6,4]
    return quick_sort(less) + equal + quick_sort(greater) # 함수를 재귀 호출 
    5                                  

arr = [5, 2, 8, 3, 1, 9, 6, 4, 7]

print(quick_sort(arr))



"""

