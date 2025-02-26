### 37.Dictionary Search By Value

import time

d = {'USA': 36, 'Germany': 17,'France':32, 'Australia': 77, 'South Africa': 99, 'India': 108, 'South Korea': 200}

# 방법1
def search_dict(word):
    try:
        c = dict((new_k.lower(),new_val) for new_k,new_val in d.items())
        return c[word] # get 이라면?
    except KeyError:
        return "No results were found for your search."
 
txt = input("Enter key: ").lower()

print(search_dict(txt))
    

# # 방법2
# def search_dict(word):
#     c = dict((new_k.lower(),new_val) for new_k,new_val in d.items())

#     return c.get(word, "No results were found for your search.")
 
# txt = input("Enter key: ").lower()

# search_dict(txt)


# 방법3
# ....