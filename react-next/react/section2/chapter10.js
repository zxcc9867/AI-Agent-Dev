// Date 객체를 생성하는 방법

let date1 = new Date(); // 생성자

// 현재 시간을 출력한다.
console.log(date1); // 2023-07-02T04:47:14.263Z (ISO 8601 형식)

let date2 = new Date("1997-01-07"); //

console.log(date2); // 1997-01-07T00:00:00.000Z

// 10시 10분 10초
let date3 = new Date("1997/01/07/10:10:10"); // 슬래쉬로도 가능

// 타임 스탬프

//  data1 ( 현재 시간 )으로 부터 몇 ms가 지났는지를 의미하는 숫자값"
let ts1 = date1.getTime();
console.log(ts1); //  예: 1734089445123

// 예시 값 1734089445123은 1970-01-01 00:00:00 UTC로부터 1조 7340억 8백9만 4천 4백 5십 1 초와 123 밀리초가 지났다는 의미입니다.

let date4 = new Date(ts1);

console.log(date4); // 1970-01-01T00:00:00.123Z

// 시간 요소들을 추출하는 방법

let year = date1.getFullYear();

let month = date1.getMonth() + 1; // 0월부터 시작하므로, 1월로 해야한다

let date = date1.getDate();

let hour = date1.getHours();

let minute = date1.getMinutes();

let second = date1.getSeconds();

// console.log(year, month, date, hour, minute, second); // 2023 6 2 4 47 14

// 4. 시간 수정하기

date1.setFullYear(2023);
date1.setMonth(7); // 실제로는 8월이 된다.
date1.setDate(14); //
date1.setHours(23);
date1.setMinutes(30);
date1.setSeconds(59);

// 5. 시간을 여러 포맷으로 출력하기

console.log(date1.toDateString());

// 현지 시간에 맞게 출력
console.log(date1.toLocaleDateString("ko-KR"));
