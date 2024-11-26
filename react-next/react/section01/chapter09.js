// if 조건문에 대하여 

// if (num >= 10){
//     console.log('10 이상')

// }else if (num >= 5){
//     console.log('5 이상입니다.') 
// }

// else{
//     console.log('10 이하')
// }
// swtich 문 
// if문과 기능은 동일 
// 다수의 조건을 처리할 때 if보다 직관적이다. 

let animal = 'cat'
// swtich는 일치하는 case를 만나면, 그 이후의 모든 코드를 수행한다.
switch(animal){
    case 'cat':
        console.log("고양이")
        break;
    case 'dog':
        console.log("개")
        break;
    case 'bird':
        console.log("새")
        break
    default:
        console.log("기타")
}

