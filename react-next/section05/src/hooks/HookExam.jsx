import useInput from '../components/useInput';
// 3가지 hook 관련된 팁

// 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2. 조건부로 호출될 수 없다. ( 조건문, 반복문 내부에서 호출 불가능)
// 3. 나만의 훅 ( 커스텀 훅 ) 직접 만들 수 있다.


const HookExam = () => {
  const [input, onChange] = useInput(); // 함수로 공통화를 만들면, 여러개의 input을 사용할 수 있다.
  const [input2, onChange2] = useInput();
  return (
    <div>
      <input value={input} onChange={onChange} />
      <input value={input2} onChange={onChange2} />
    </div>
  );
};

export default HookExam; // default export를 사용하여 HookExam 컴포넌트를 default로 export
