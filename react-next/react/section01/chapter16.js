// 배열 

// 여러개의 값을 순차적으로 담을 수 있는 자료형 

// 배열 생성 

let arr = new Array() // 배열 생성자 

let arrB = []

let arrC = [1,2,3,true,undefined,null,()=>console.log('haha')]
console.log(arrC)

// 배열 요소 접근 



// console.log(arrC[-1]) // 자바에서는 음수 인덱스를 지원하지 않는다. 

console.log(arrC[arrC.length-1]) // 이렇게 해야 맨마지막 인덱스를 출력 

arrC[arrC.length-1]() // haha 출력

// 배열의 값 출력 

arrC[0] = 'hello'