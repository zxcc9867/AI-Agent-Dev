"""
객체 지향 프로그래밍 
"""

from turtle import Turtle, Screen
from prettytable import PrettyTable

# class Car:
#     def __init__(self, color, model, year):
#         self.color = color
#         self.model = model
#         self.year = year


# car_A = Car("RED", "NISSAN", 2025)

# print(car_A.model)

# timmy = Turtle()  # tutle모듈을 불러왔고, Turtle 모듈을 불러왔다.
# timmy.shape("turtle")
# timmy.color("purple")
# timmy.goto(100, 50)


# my_screen = Screen()
# print(my_screen.canvheight)
# my_screen.exitonclick()

## pretty table 객체 생성

table = PrettyTable()

table.add_column("pokemon Name", ["pikachu", "charmander"])
table.add_column("Type", ["Electric", "water"])
print(table.align)
print(table.attributes)
# table.bottom_right_junction_char = "2"
print(table)

from menu import Menu
from coffee_maker import CoffeeMaker
from money_machine import MoneyMachine

is_on = True


menu = Menu()
while is_on :
    options = menu.get_items()
    choice = input(f"Choose an option: {options} ")
    if choice == "off":
        is_on = False
    elif choice == "report":
        CoffeeMaker.report_menu()
        MoneyMachine.report_money()
    else :
        drink = menu.find_drink(choice)
        CoffeeMaker.is_resource_sufficient(drink)
        if CoffeeMaker.is_resource_sufficient(drink):
            print(MoneyMachine.make_payment(drink.cost))