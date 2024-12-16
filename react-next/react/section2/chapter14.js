// async

// 어떤 함수를 비동기 함수로 만들어주는 키웓드
// 함수가 promise를 반환하도록 변환해주는 그런 키워드

async function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "박원진",
        id: "astar",
      });
    }, 1500);
  });
}

// await
// async 함수 내부에서만 사용이 가능한 키워드
// 비동기 함수가 다 처리되기를 기다리는 역할

async function prinData() {
  const data = await getData(); // async 함수는 항상 promise 객체를 반환한다.
  // 반환값이 명시되어 있지 않으면, 기본값은 undefined이다.
  // setTimeout은 비동기 작업이지만, promise로 감싸지 않으면 getData는 즉시 undefined를 반환한다.
  console.log(data);
}

prinData();

// 다시 복습할것

// 비동기 작업 수행해보기

async function prindata() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "park",
        id: "user",
      });
    });
  }, 1500)
}
async function prind() {
  const test = await prindata();
}
