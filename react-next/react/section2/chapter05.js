// 순회 

// 배열, 객체에 저장된 여러개의 값에 순서대로 하나씩 접근하는 것을 말한다. 

// 배열 순회 

let arr = [1,2,3]

// 배열 인덱스 

for (let i = 0 ; i < arr.length ; i++) {
      //  console.log(arr[i])
}


let arr2 = [4,5,6,7,]

for (let i = 0 ; i < arr2.length ; i++) {
    //  console.log(arr2[i])
}

// for of 반복문 

// for of 는 배열을 순회하기 위한 것

for (let item of arr){ // 파이썬의 for in 이랑 같다. 인덱스를 저장하지 않고, 배열안의 값을 순회한다. 
    // console.log(item)
}

// 객체 순회 

let person = {
    name : 'kim',
    age : 20,
    hobby : ['reading', 'painting']
}

// 2.1 object.Keys 
// -> 객체에서 key값들만 뽑아서 새로운 배열로 반환 

// let keys = Object.keys(person)

// for (let i=0 ; i<keys.length ; i++){
//     console.log(keys)
//         }
// for (let key of keys){
//     console.log(key,person[key])
// }

// 2.2 object.values

// 객체에서 value 값들만 뽑아서 새로운배열로 변환 


// for (let value of Object.values(person)) {
//     console.log(value) // 파이썬이랑 다르게 Object라는 메서드를 사용해야한다. 
// }

// 2.3 for in // for in도 있다. -> for of와 비슷하다. 

for (let key in person){
    value = person[key]
    console.log(key, value)
}

// for of는 배열에서만 사용할 수 있고, for in은 객체에서만 사용할 수 있다. 

for ( let a in arr){
    console.log(a) // 이렇게 출력하면, 배열의 값이 아닌, 인덱스 0,1,2가 출력이 된다.
    // for in으로 값에 접근하려면 
    console.log(arr[a]) // 이렇게 해야한다. 

}

let object = {
    name : 'kim',
    age : 20,
    hobby : ['reading', 'painting']
}


for (item in object){
    console.log(`item : ${item} , ${object[item]}`)
}