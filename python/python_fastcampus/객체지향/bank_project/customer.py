"""

은행 고객 

"""

from bank import BankAccount


class Customer(BankAccount):

    def __init__(self, name):
        self.name = name

        print(f"안녕하세요. {self.name}님 ! ")

    def add_withdraw_balance(self, account_number, amount, command):
        balance = self.get_balance()
        if account_number in self.get_account_list() and command == "add":
            balance += amount
        elif account_number in self.get_account_list() and command == "withdraw":
            balance -= amount

    def info(self):
        print(
            f"""{self.name}님의 계좌 리스트는 {self.get_account_list()}이며,
              총 보유 금액은{self.get_balance()}입니다."""
        )  # 나중에 계산식 수정
