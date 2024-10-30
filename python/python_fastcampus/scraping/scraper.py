"""
스크랩핑 파일 
"""

from bs4 import BeautifulSoup
import requests

url = "https://www.musinsa.com/brand/musinsastandard?gf=A"

params = {"d_cat_cd": "001", "page_kind": "onsale"}

headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
}


response = requests.get(url, params=params, headers=headers)

res_text = requests.get(url, params=params, headers=headers)

print(res_text.text)

# soup = BeautifulSoup(response.content, 'html.parser')
# print(soup)
# soup.find("div",)
# print(response.status_code)
