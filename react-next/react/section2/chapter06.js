// push 메서드 

// 배열의 맨뒤에 새로운 요소를 추가하는 메서드 


`
< 배운 메서드 > 

1. pop : 맨뒤의 값을 삭제하고 그 값을 반환 
2. push : 배열의 맨뒤에 값을 삽입 
3. shift : 배열의 앞에 값을 삽입하고 배열의 길이 반환 
4. unshift : 배열의 맨 뒤에 값을 삽입하고, 배열의 길이 반환
5. slice : 배열을 특정 범위까지 잘라낸다. 음수로 하면 뒤에서 배열의 원소를 취득 
6. concat : 배열을 이어주는 것  
`


let arr = [1,2,3]

arr.push(4,5,6,7)

// console.log(arr)

// 2. pop 배열의 맨뒤에 있는 요소를 제거 

let arr2 = [1,2,3]

const popedItem = arr2.pop()

// console.log(popedItem)

// 3. shift 메서드 

// 배열의 맨 앞의 요소를 제거하고 반환 

let arr3 = [1,2,3]
// console.log(arr3.shift())

// 4. unshift

// 배열의 맨 앞에 새로운 요소를 추가하고 변경된 배열 길이 반환 

let arr4 = [1,2,3]
const newLength = arr4.unshift(0)

// console.log(arr4.unshift(1))
// console.log(newLength) 

// 5. slice 

// 마치 가위처럼 배열의 특정 범위를 잘라내서 새로운 배열로 반환 

let arr5 = [1,2,3,4,5]

console.log(arr5.slice(2,5)) // 5번 인덱스의 전의 인덱스인 4까지 자른다. 

// 원본 배열의 값은 바뀌지 않는다. 

console.log(arr5.slice(2,)) // 2번째 인덱스부터 끝까지 자른다. 

console.log(arr5.slice(-1)) // 뒤에서 하나만 자른다. 5가 출력

console.log(arr5.slice(-3)) 

//6. concat 메서드 

// 두개의 서로 다른 배열을 이어 붙여서 새로운 배열을 반환 

let arr6 = [1,2]
let arr7 = [3,4]

let concatedArr = arr6.concat(arr7) // arr6뒤에 arr7이 연결된다. 

console.log(concatedArr) // [1, 2, 3, 4]