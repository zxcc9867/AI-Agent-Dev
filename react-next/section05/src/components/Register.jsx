// 간단한 회원가입 폼

// 1. 이름
// 2. 생년월일
// 3. 국적
// 4. 자기 소개

// onChange 속성은 입력값이 변경될때마다 호출된다.
// 입력 이벤트가 발생하면 지정된 함수가 자동으로 실행된다.
import { useState, useRef } from 'react';
const Register = () => {
  const [input, setInput] = useState({
    name: '',
    birth: '',
    country: '',
    bio: '',
  });

  const countRef = useRef(0);
  const inputRef = useRef(null);

  const onSubmit = () => {
    if (input.name === '') {
      console.log('inputRef.current:', inputRef.current);
      // 이름을 입력하는 DOM 요소 포커스 -> 특정 필드를 가르키도록 만든다.
      inputRef.current.focus();
      return;
    }
  };

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    countRef.current++;

    setInput({
      ...input,
      [e.target.name]: e.target.value, /// [e.target.name]의 값이 프로퍼티의 키로 설정된다.
      // 즉, 이벤트가 발생한 태그의 네임 태그의 값이 설정되어 있다.
      // 때문에, 생년월일 태그인 input 태그에 이벤트가 발생하면, e.target.name에는 birth가 된다.
      // 즉, birth : e.target.value 가 된다. birth의 e.target.value인 birth값을 입력하라
    });
  };

  return (
    // value : input 필드의 초기값
    // onChane : input필드의 입력값이 변경될 때 호출
    // placehoder : input 필드를 회색깔로 바꿈
    <div>
      <div>
        <input
          ref={inputRef} // input의 DOM 요소 전체를 inputRef.current에 자동으로 할당한다.
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder={'이름'}
        ></input>
        <h3>{input.ref}</h3>
      </div>

      <div>
        <h3>{input.name}</h3>
      </div>
      <input
        ref={inputRef} // 2개가 할당이 되면, 마지막으로 할당된 DOM 요소가 할당된다. 
        name="birth"
        value={input.birth}
        onChange={onChange}
        type="date"
      ></input>

      <div>
        <select name="country" value={input.country} onChange={onChange}>
          <option></option>
          <option value="KOR">한국</option>
          <option value="USA">미국</option>
          <option value="JPN">일본</option>
        </select>
      </div>
      <div>
        <textarea
          name="bio"
          value={input.bio} // React의 상태값으로써 onChangeBio 함수에 전달되는 값
          placeholder={'자기소개'}
          onChange={onChange}
        ></textarea>
      </div>
      <button onClick={onSubmit}>제출</button>
    </div>
  );
};

export default Register;
