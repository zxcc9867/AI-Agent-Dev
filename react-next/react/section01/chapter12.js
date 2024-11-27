//콜백 함수 

// 자신이 아닌 다른 함수에 인수로써 전달된 함수를 의미한다. 
// 콜백 함수는 함수를 원하는 타이밍에 실행시킬 수 있다. 

function call1(callfunc){ 
    callfunc()
}

function call2(){
    console.log('call2')
}

let call3 = ()=>console.log('call3')


// call1(call2) // 함수의 매개변수로 함수를 호출한다. 

// call1(call3)

call1(() => console.log('call1'))

function repeat(count,callback){
    for(let i=1; i<=count; i++){
        callback(i) // 매개변수의 callback이 함수를 가지고 있으므로, 다시 함수를 호출한다. 
    }
}

repeat(5, (idx) => {
    console.log(idx)
})


a = (value) => {return value+1} // return을 해야 값을 반환 

console.log(a(15))

repeat(5,function (idx){{
    console.log(idx*2) // callback 함수에서 this를 바인��할 때, arrow function을 사용한다.
}})


// function repeatDouble(count){
//     for(let i=1; i<=count; i++){
//         console.log(i*2)
//     }
// }

// let repeatDouble2 = (count)=>{
//     for(let i=1; i<=count; i++){
//         console.log(i*2)
//     }
// }

// repeatDouble2(5)

