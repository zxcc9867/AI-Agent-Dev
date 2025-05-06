from pathlib import Path
work_dir = Path(__file__).parent
in_dir,out_dir = work_dir / "input" , work_dir / "output"
if __name__ == '__main__':
    in_dir.mkdir(exist_ok=True)
    out_dir.mkdir(exist_ok=True)

"""
< openpyxl 패키지 >

파이썬에서 데이터를. 액셀 파일로 저장하거나, 액셀 파일을 파이썬에서 사용할 떄 사용 

< pandas 패키지 >

데이터 분석 분야에서 사용 

데이터 프레임이라는 자료 구조를 사용한다. 

데이터 프레임은 행과 열로 구성된 객체이다 

< seaborn 패키지 >

데이터 시각화 패키지


"""

# 리스트를 활용하여 생성한 데이터 프레임 

# import pandas as pd

# data = [
#     ["키","학생",180]
# ]
# df = pd.DataFrame(data,columns=['test','직업','키'])

# print(df) # 데이터 프레임은 행과 열로 데이터를 만들어준다. 

