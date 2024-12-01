// 스코프 

// 변수나 함수에 접근하거나 호출할 수 있는 범위를 말한다. 



function funcA(){
    let a = 1 // a 접근 가능 영역 
    function func(){ // 지역 스코프
        
    }
}
// console.log(a) // 에러 발생 -> 접근 불가능 영역이기때문 

// 전역 스코프 : 전체 영역에서 접근 가능 

// 지역 스코프 : 특정 영역에서만 접근이 가능 

if (true){
    let c = 1 // 지역 변수  
    function func(){ // 전역 스코프
        
    }
}

for (let i = 0; i < 10 ; i++) { 
    let d = 1 // 지역 변수 
    function func(){ // 전역 스코프
        
    }
}

// func() // 에러 발생 