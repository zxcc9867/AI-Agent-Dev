# 시각화 헤보기 

import pandas as pd
from step_3 import out_3_2

N=4
df_raw = pd.read_excel(out_3_2)
# iloc[:N]은 0부퉈 N-1행까지 슬라이싱을 한다.
# iloc 메서드는 배열 인덱스와 다르게 행과, 열을 선택할 수 있다. 
# 예를들어, iloc을 iloc[4:,2]를 수행하면, 4행이후부터 끝까지 행에서 2열만 출력한다. 
df_head,df_tail = df_raw.iloc[:N],df_raw.iloc[N:]


df_sum = df_tail.drop(columns=["분류"]).sum().to_frame().transpose()
df_sum["분류"] = "기타"
df_final = pd.concat([df_head,df_sum],ignore_index=True)

print(df_final)

