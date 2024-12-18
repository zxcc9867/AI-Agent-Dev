import { useState } from 'react';

function useInput() {
  // 함수이름앞에 use를 사용하면, 리액트는 내부적으로 커스텀 훅이라고 판단하여, 함수 내부에서
  // 훅을 호출할 수 있다.
  const [input, setInput] = useState('');
  const onChange = (e) => {
    setInput(e.target.value);
  };
  return [input, onChange];
}

export default useInput;