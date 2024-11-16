// 1. 묵시적 형변환 

let num = 10

let str ="20"

const result = num + str // num이 string 타입으로 변환되었기 때문에 resulte의 결과는 1020이다. 
console.log(result)

// 명시적 형 변환 

// 프로그래머 내장 함수 등을 이용해서 직접 형 변환을 명시 

// 문자열 -> 숫자 

let str1 = '10'

let strToNum1 = Number(str1)

let strNUm2 = parseInt('29개') // 숫자만 인식해서 이를 number 형태로 변환한다. 

console.log(strToNum1 + 10) // 20

console.log(strNUm2) // 29

// 숫자에서 문자열 

let num1 = 20 

let numTostr = String(num1)

