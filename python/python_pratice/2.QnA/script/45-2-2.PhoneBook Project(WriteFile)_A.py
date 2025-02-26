### 45.PhoneBook Project(WriteFile)

# To-do list
# 1. json 파일에 데이터가 없을 경우 고려
# 2. pid 번호가 순서가 유지되도록 고려
# 3. 오름 및 내림 차순 정렬
# 4. 전화번호 검색 고려
# 5. 이름 and 전화번호 중복 확인 고려
# 6. 기타 추가

import json

def list_phonebook():
    """ List member in phone book. """
    
    # Phonebook read
    f = open('../source/45-1.json', 'r')
    d = json.load(f)

    for pid in d:
        print('\nPID:', int(pid) + 1)
        for p_info in d[pid]:
            print(p_info + ':', d[pid][p_info])
    
    # File I/O close
    f.close()


def add_member():
    """ Add a new member to the phone book."""

    print("\nEnter the information of the member")
    
    name = input('Name: ')
    phone = input('Phone: ')

    name_check = False

    # Phonebook read
    f = open('../source/45-1.json', 'r')
    d = json.load(f)

    # File I/O close
    f.close()
    
    for pid in d:
        if name == d[pid].get('Name'):
            name_check = True

    if name_check is True:
        print('\n# The member is already in the phone book')
    else:
        with open('../source/45-1.json', 'w') as f:
            d[len(d)] = {'Name': name, 'Phone': phone}
            
            # Dict to json
            json_obj = json.dumps(d, indent=4)
            
            # Phonebook write to file
            f.write(json_obj)
            
            print('\n# The phone number has been written to the phone book')
            
    return d


def delete_member():
    """ Delete a member from the phone book. """

    print("\nEnter the name")
    name = input('name: ')
    
    # Phonebook read
    f = open('../source/45-1.json', 'r')
    d = json.load(f)
    
    # File I/O close
    f.close()

    for pid in d:
        if name == d[pid].get('Name'):
             with open('../source/45-1.json', 'w') as f:
                # Delete member
                del d[pid]
                
                # Dict to json
                json_obj = json.dumps(d, indent=4)
            
                # Phonebook write to file
                f.write(json_obj)
                
                print('\n# The member has been deleted')

                # If exist name return(exit function)
                return d
            
    print('\n# The member is not in the phone book')


def mainmenu():
    """ Main function"""

    while True:
        menu = input("""
----MAIN MENU----
1: List phonebook
2: Add a new member
3: Delete a member
4: Program exit 
Please enter your choice: """)
        
        if menu == '1':
            list_phonebook()
        elif menu == '2':
            add_member()
        elif menu == '3':
            delete_member()
        elif menu == '4':
            print('# Exit!')
            return False # break
        else:
            print('\n Menu cannot be found')

mainmenu()