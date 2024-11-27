// 함수 표현식과 화살표 함수 

function funcA(){
    console.log('Function expression')
}

// let varA = funcA()

// console.log(varA) 

let varB = function funcB(){
    console.log('functionB')
}

varB()
// funcB() // 함수의 이름으로 못부른다. 변수의 이름으로 불러야한다. 

// 함수의 이름을 지정하지 않고 악명함수 형태로 호출할 수 도 있다. 
let varC = function (){ // 함수표현식으로 만든 것은 호이스팅이 되지 않는다. 
    console.log('functionB')
}

// 화살표 함수 

let varD = (value) => {
   console.log('Arrow function', value)
   return value + 1
} // 1을 리턴하는 익명 함수 
console.log(varD(10))

let varE = (value) => value+1

console.log(varE(11))