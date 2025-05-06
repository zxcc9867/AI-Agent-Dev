"""
< 피벗 테이블 >

피벗 테이블을 사용하면 데이터의 분류, 요약, 통계 등의 작업을 빠르고 편리하게 처리할 수 있다.

예를 들어, 2024년 1분기 카드 명세서의 지출 내역을 분류 열을 기준으로 요약하면

카드 지출을 어디에 많이, 또는 적게 했는지 파악할 수 있다.

pd.pivot_table(
df ( 피벗 테이블을 만들 데이터 프레임 ),
index="row" ( 피벗 테이블의 행이 될 집계 기준 열)
columns="column" ( 피벗 테이블의 열이 될 집계 기준 열 )
values="value" ( 집계할 데이터 ),
aggfunc="sum" ( 집계 방식 )
)

< aggfunc에 전달할 수 있는 함수 >
1. sum 
2. mean 
3. max 
4. min

"""

import pandas as pd
from step_2 import out_2_2 
from step_1 import out_dir
from pathlib import Path

out_3_2 = out_dir/f"{Path(__file__).stem}.xlsx"

if __name__ == '__main__':
    # 참고로 out_2_2는 2024년3-5월 등등 여러 액셀 파일들이 합쳐져있는 액셀 파일일
    df_raw = pd.read_excel(out_2_2)

    df_pivot_1 = pd.pivot_table(df_raw,index="분류", values="사용금액", aggfunc="sum")

    # 행에 대해 [0:7]과 같이 슬라이싱을 하면, 해당 행의 0-6번의 값을 거래연월에 넣고, 그 다음 7번째 인덱스부터 값이 없기 때문에 Nan이 출력된다. 
    # df_raw["거래연월"] = df_raw["거래일시"][0:7]

    df_raw['거래연월'] = df_raw['거래일시'].str.slice(0,7) # 각 행의 문자열 데이터에서 0부터6까지 잘라서 그 값을 거래연월이라는 행에 넣는다.

    # 분류라는 항목을 기준으로 행을 만들고, 거래연월을 기준으로 열을 만든다. 
    df_pivot_2 = pd.pivot_table(df_raw, index='분류',columns='거래연월',values='사용금액',aggfunc='sum')

    # 행별 합계 
    df_pivot_2['누적금액'] = df_pivot_2.sum(axis=1) 

    # 오름차순을 False 했으므로, 내림차순으로 정렬한다. 
    df_sort = df_pivot_2.sort_values("누적금액",ascending=False)

    # 기존의 행이였던 분류를 컬럼으로 되돌리고, 기존의 분류행을 인덱스로 바꾼다.
    df_reindex = df_sort.reset_index()

    df_reindex.to_excel(out_3_2, index=False,sheet_name="분류별누적금액")

