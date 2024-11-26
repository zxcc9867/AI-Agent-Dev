// 함수 

// 여기저기에서 공통으로 사용되는 코드를 함수로 만듬 


res = greeting(10,20); // 함수 호출 

console.log(res) // 넓이 200라고 반환 

// 자바스크립트에서는 함수가 함수를 호출하는 것보다 밑에서 작성되어도 
// 에러가 발생하지 않는다. -> 호이스팅 때문 
// 호이스팅은 내부적으로 함수를 제일 최상단으로 끌어올리기 때문에 함수선언이 
// 무조건 위에 작성되지 않아도 된다. 
function greeting(width,height){

    function another(){ // 중첩 함수 
        console.log('another function')
    }
    another()
    
    return '넓이 '+width*height // return은 수행되면 함수가 바로 종료된다.

}