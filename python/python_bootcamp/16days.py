"""
객체 지향 프로그래밍 
"""

from turtle import Turtle, Screen


class Car:
    def __init__(self, color, model, year):
        self.color = color
        self.model = model
        self.year = year


car_A = Car("RED", "NISSAN", 2025)

print(car_A.model)

timmy = Turtle()  # tutle모듈을 불러왔고, Turtle 모듈을 불러왔다.
timmy.shape("turtle")
timmy.color("purple")
timmy.goto(100, 50)


my_screen = Screen()
print(my_screen.canvheight)
my_screen.exitonclick()
