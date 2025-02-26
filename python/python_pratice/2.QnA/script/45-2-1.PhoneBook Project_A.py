### 45.PhoneBook Project

""" phone book with example members. """
phonebook = {
                0: {'Name': 'Kim', 'Phone': '45648733'},
                1: {'Name': 'Lee', 'Phone': '89376333'},
                2: {'Name': 'Park', 'Phone': '36457818'},
                3: {'Name': 'Chung', 'Phone': '76891234'},
                4: {'Name': 'Choi', 'Phone': '67451237'}
            }


def list_phonebook(d):
    """ List member in phone book. """

    for pid in d:
        print('\nPID:', pid + 1)
        for p_info in d[pid]:
            print(p_info + ':', d[pid][p_info])


def add_member(d):
    """ Add a new member to the phone book."""

    print("\nEnter the information of the member")
    
    name = input('Name: ')
    phone = input('Phone: ')

    name_check = False

    for pid in d:
        if name == d[pid].get('Name'):
            name_check = True

    if name_check is True:
        print('\n# The member is already in the phone book')
    else:
        d[len(d)] = {'Name': name, 'Phone': phone}
        
        print('\n# The phone number has been added to the phone book')

    return d


def delete_member(d):
    """ Delete a member from the phone book. """

    print("\nEnter the name")
    
    name = input('name: ')

    for pid in d:
        if name == d[pid].get('Name'):
            del d[pid]
            print('\n# The member has been deleted')
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
            list_phonebook(phonebook)
        elif menu == '2':
            add_member(phonebook)
        elif menu == '3':
            delete_member(phonebook)
        elif menu == '4':
            print('# Exit!')
            return False # break
        else:
            print('\n Menu cannot be found')

mainmenu()