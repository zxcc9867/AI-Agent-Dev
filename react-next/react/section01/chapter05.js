// 자료형 원시타입에 대해서 

// 1. 넘버 타입 

let num1 = 27;
let num2 = 1.5

console.log(num1 + num2)

let inf = Infinity

let minf = Infinity

let nan = NaN // not number -> 수치연산이 실패했을 때, 결과값으로 나옴 

console.log(1*'hello') // NaN이 출력하다. 

// 2. 스트링 타입 

let myName = '박원진'

let myLocation = '창원'

let introduction = myName + ' ' + myLocation

// 템플릿 리터럴 문법 -> ` ${} ` 

let introductionText = `${myName}은 ${myLocation}에 거주합니다.`

// console.log(introductionText)

// 3. boolean Type

let isSwtich = true
let isEmpty = false

//4. Null Type ( 아무것도 없다. )

let empty = null // 직접 명시적으로 변수에 할당해주어야 하는 값이 null이다. 

// 5. Undefined Type ( 아직 정해지지 않았다. )

undefined // 아무런 값을 할당하지 않았을 때 자동으로 들어가는 값 

let none; // undefined이 출력된다. 
console.log(none)

// null과 undefined의 차이점

// undefined은 값을 명시해주지 않으면 출력되는 값 

// null은 개발자가 의도적으로 값이 없음을 명시해주는 값