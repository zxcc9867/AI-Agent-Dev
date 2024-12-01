// Truthy , Falsy 



// if (123){
//     console.log("참")
// }

// if (undefined){
//     console('undefined') // undefined는 거짓이기 때문에, false여서 실행이 안된다. 
// }

function test(person){
    if (person === undefined || person === null){ // 조건문이 길고, 여러번 추가해야한다. 
        console.log("undefined or null")
        
    }else{
        console.log(person.name)
    }
}

const person = {name : 'park'}

test(person) // park

function test(person){
    if (!person){ // undefined와 null을 매번 검사하는 거 보다 , !를 통해 값이 있는지 없는지 확인한다. 
        console.log("undefined or null")
        
    }else{
        console.log(person.name)
    }
}