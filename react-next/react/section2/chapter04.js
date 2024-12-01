// spread 연산자 

// 객체나 배열에 저장된 여러개의 값을 흩뿌려주는 역할 

let arr1 = [1,2,3]

// 기존 
// let arr2 = [4,arr[0],5,arr[1],6,arr[2]]

// spread 연산자
let arr2 = [4,...arr1,5,6]

// console.log(arr2) // [4, 1, 2, 3, 5, 6]

// 객체 

let obj1 = {
    a : 1,
    b : 2
}

let obj2 = {
    ...obj1, // obj1객체가 들어가게된다. 
    c : 3 ,
    d : 4 
}

// console.log(obj2)

function funcA(p1,p2,p3){
    // console.log(p1,p2,p3)
}

funcA(...arr1)


// rest 매개변수 

// rest는 나머지 , 나머지 매개변수 

function funcB(one,two,...rest){ // 첫번째 매개변수의 값의 이름을 one에 저장한다.
    // console.log(...arr1) // 1 2 3 출력 
    console.log(one,two)
    console.log(rest) // [1,2,3]
}
funcB(...arr1)

// 스프레드는 배열을 펼쳐 매개변수로 전달한다. 
// 나머지 매개변수는 함수의 매개변수에 여러 값을 묶어 배열 형태로 전달받는 역할 