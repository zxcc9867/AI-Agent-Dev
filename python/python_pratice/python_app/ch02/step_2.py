import pandas as pd
from step_1 import in_dir,out_dir
from pathlib import Path

out_2_2 = out_dir/f"{Path(__file__).stem}.xlsx"

if __name__ == "__main__":

    result = []

    # glob로 디렉토리안에 존재하고 있는 특정 패턴의 파일을 찾을 수 있다. 
    # glob는 반복가능한 iterator로 반환 ( 리스트 )
    for xlsx_path in Path(in_dir).glob("2024년*월.xlsx"):
        #  b부터e열까지 데이터가 존재하고, 첫번째 행과 두번째 행의 값은 사용하지 않기 때문에 skip
        df_raw = pd.read_excel(xlsx_path, sheet_name="Sheet1",usecols="B:E",skiprows=2)

        result.append(df_raw)
    # concat를 통해 result 안의 3개 파일의 내용을 하나로 합친다. 
    # concat를 사용하지 않으면, 0-30 , 0-30 처럼 따로따로 데이터가 출력된다. 
    # 또한, concat을 사용하지 않으면, result는 리스트이기때문에, to_excel 메서드를 사용할 수 없다. 
    # 때문에, concat으로 result 리스트의 데이터들을 모두 합쳐서 새로운 하나의 데이터 프레임으로 만든다.
    df_concat = pd.concat(result)
    df_concat.to_excel(out_2_2/f"{Path(__file__).stem}.xlsx",index=False)

