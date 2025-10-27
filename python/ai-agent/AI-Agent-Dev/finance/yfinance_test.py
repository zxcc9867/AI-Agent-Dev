import yfinance as yf
from gpt_functions import get_current_date, tools

msft = yf.Ticker("MSFT")

nist = msft.history(period="5d")
print(nist)



