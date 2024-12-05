// 5가지 요소 순회 및 탐색 메서드 
// 1. forEach 
// 모든 요소를 순회하면서 각각의 요소에 특정 동작을 수행시키는 메서드 

let arr1 = [1,2,3]

arr1.forEach(function(item,idx,arr){
    // console.log(idx, item*2)
})

let dobuledArr = []

arr1.forEach((item)=>{
    dobuledArr.push(item*2) // arr1의 각 원소에 대해서 곱하기 2를 하고 새로운 배열에 푸시 
})

// 2. includes 

// 배열의 특정 요소가 있는지 확인하는 메서드 

let arr2 = [1,2,3]
const check = arr2.includes(3)

// console.log(check)

// 3. indexOf



// 특정 요소의 인덱스를 찾아서 반환하는 메서드 

let arr5=[1,2,3]

let index = arr5.indexOf(2)
console.log(index) // 1번째 있다고 반환 중복일 경우, 맨처음 인덱스 반환 
// 존재 하지 않을 경우, -1 반환 

let object1 = [
    {name : 'park'},
    {name :  'jin'}
]

let check_index = object1.indexOf({name:'park'})

// console.log(check_index) // -1



// findIndex

let object2 = [
    {name : 'park'},
    {name :  'jin'}
]

const check_index2 = object2.findIndex((item)=> item.name === 'park')

console.log(check_index2) // 0이라고 출력이 된다.즉 첫번째에 있다라는 것 

// 모든 요소를 순회하면서, 콜백함수를 만족하는 그런 

// 특정 요소의 인덱스를 반환하는 메서드 

let arr6 = [1,2,3,4,5]

const findIndex = arr6.findIndex((index)=>{
    if (index === 5){
        return true;
    }
    })

console.log(findIndex) // 4번째


const findIndex2 = arr6.findIndex((index)=>index === 5)

// console.log(findIndex2) // 4번째


// 5. find 

// 모든 요소를 순회하면서 콜백함수를 만족하는 요소를 찾는데, 요소를 그대로 반환 

let arr7= [
    { name : 'test'
    },
    {
        name : 'test2'
    }
]


const finded = arr7.find((item)=> item.name === 'test2')

console.log(finded) // { name: 'test2' }



arr9=[1,5,6,7,]

/*rest를 사용하지 않으면, 배열의 모든 원소를 받기 위한 변수를 매개변수로 정의해야 한다. */
const arrow = (a,b,c,)=>{ // { name: 'test
    console.log(a,b,c)
}

arrow(...arr9) // 10

// rest를 사용하면 , 한번에 배열로 받고, 구조 분해할당을 통해 
// 원소를 넣을 수 있다. 

const arrow2 = (...arr9)=>{ // { name: 'test
    [a,b,c] = arr9
    console.log(a,b,c)
}

arrow(...arr9) // 10