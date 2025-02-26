### 44.Advanced Write File Loop

# 방법
# 다양한 방법으로 구현 가능
# file mode에 주의
filepath = '../source/44-1.txt'
intro = "Select a menu number : "
file = open(filepath, 'a+')

while True:
    
    print("--------------------------")
    print("1. read")
    print("2. write")
    print("3. exit")
    print("--------------------------")
    
    menu = int(input(intro))

    if menu == 1:
        # file.seek(0) 가능
        file = open(filepath, 'r')
        
        print(file.read())
        
        file = open(filepath, 'a+')
        
        print()
        
        print("--------------------------")
        print(">> Data read complete. <<")
        print("--------------------------")
  
    elif menu == 2:
        
        text = input('Write a text')
        
        file.write(text + '\n')
        
        print()
        
        print("--------------------------")
        print(">> Data write complete <<")
        print("--------------------------")
   
    elif menu == 3:
        file.close()
        
        print()
        
        print("--------------------------")
        print(">> Program exit. <<")
        print("--------------------------")
        
        break
