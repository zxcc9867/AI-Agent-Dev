`common js
// const moduleData = require("./math");

// // console.log(moduleData); // { add: [Function: add], sub: [Function: sub] }

// console.log(moduleData.add(1, 2));
// console.log(moduleData.sub(1, 2));


const { add, sub } = require("./math"); // 해당 경로에서 파일을 불러온다. 
console.log(add(1, 2));
console.log(sub(1, 2));

`;

// import mul, { add, sub } from "./math.js"; // es모듈을 사용할 때에는 모듈의 확장자까지 적어줘야 한다.
// console.log(add(1, 2));
// console.log(mul(2, 5));

// 라이브러리를 불러올 때에는 from 뒤에는 라이브러리 명을,
// import 에는 라이브러리에서 기본 내보내기 ( default export )된 항목을 작성성
import randomColor from "randomcolor";

const color = randomColor();
console.log(color);

