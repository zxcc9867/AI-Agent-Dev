
// null 병합 연산자 

// null , undefined 아닌 값을 찾아내는 연산자 


let var1
let var2 = 20
let var3 = 50

let var4 = var1 ?? var2 // undefined가 아닌 값을 찾아준다.

// var4에는 초기화를 하지 않았기 때문에 undefined가 들어가있다.

// 즉, undefined가 아닌 var2가 var4에 저장된다.

// console.log(var4) // 20이 출력

let var6 = var2 ?? var3 // 둘다 null , undefined가 아니라면, 맨처음 값이 들어가게 된다. 

// console.log(var6)

// typeof 연산자 

// 값의 타입을 문자열로 반환하는 기능을 하는 연산자 

let var7 = 1
var7 = "hello"

// console.log(typeof var7) // number, string

// typeof var7

// 3항 연산자 -> 항을 3개 사용하는 연산자 

// 참이나 거짓일 때의 값을 다르게 반환 

let var8 = 10 

// 콜론을 기준으로 조건식의 참일 때 수행할 내용과 거짓일 때 수행할 내용을 작성한다. 

// 조건 ? 참 : 거짓 

let result = var8%2 === 0 ? "짝수" : "홀수"



// 파이썬의 경우 

// 참 if 조건 else 거짓 

// result = "양수" if var8%2 == 0 else "음수"


