// math 모듈
export function add(a,b){
    return a+b
}

export function sub(a,b){
    return a-b
}

`Common js

// module.exports = {
//     add : add, // add라는 값으로 add 함수를 내보낸다.
//     sub : sub
//     // 키와 value의 값이 같을 경우, 아래와 같이 사용할 수 있다. 
//     // add,
//     // sub
// }
`
export default function multiply(a,b){ //기본값으로 설정하면, 함수를 불러올 때, 
    // import multiply 처럼 중괄호 없이 혹은 
    // import mul 이런식으로 아무런 값으로 불러올 수 있다.
    return a*b
}