// 상수 객체 



//

// 객체 생성 
let obj1 = new Object(); // 객체 생성자 
let obj2 = {} // 객체 리터럴 


const animal = { // 상수에 대한 객체에 대해서 프로퍼티를 추가하거나, 기존의 값을 변경, 프로퍼티 삭제가 가능하다. 
    type : '고양이',
    name : '나비'
}

animal.name = '까망이'
animal.age = 10 
delete animal.type
animal.panda = true

// console.log(animal)

// 메서드 
// 값이 함수인 프로퍼티를 말한다. 

const person = {
    name : 'park',
    // 메서드 
    sayHi : function(){
        console.log('안녕하세요!')
    },
    call : ()=>console.log('call !'),
    haha(){ // 메서드 선언 
        console.log('haha')
    }
}

const person1 = {
    name : 'kim',
    sayHi : ()=>console.log('안녕하세요!'),
    hobby : ()=>console.log('취미')
}


person1.age = 10
let property = 'hobby'

let hobby = person1[property] // 객체의 함수가 들어가 있다. 

hobby() // 취미 출력 

person1.job = "developer"
person1['cusine'] = '짜장면' // 괄호로 객체에 프로퍼티를 추가할 수 있다. 

// console.log(person1) //

// 프로퍼티 수정 

person1.job = 'educator'

person1['cusine'] = '김말이'

// console.log(person1) //

// 프로퍼티 삭제 

delete person1.job
delete person1['cusine']

console.log(person1)

// 프로퍼티 존재 유무 확인 (in 연산자)

let result1 = 'name' in person // person이라는 객체에 name이라는 프로퍼티가 있는지 확인 
console.log(result1) 

let res = 'cat' in person

console.log(res) // person이라는 객체에 cat이라는 프로퍼티가 없기 때문에 false가 출력된다.