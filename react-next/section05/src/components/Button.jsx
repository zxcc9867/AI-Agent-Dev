const Button = ({ text, color, children }) => {
  console.log(text, color);
  // 이벤트 객체
  const onClick = (e) => { // e에는 이벤트 객체가 출력된다. 
    console.log(text, color);
    console.log(e);
    // handleClick(); // handleClick() is not defined.
    // handleClick is not defined in this scope.
  };
  return (
    <button
      onClick={onClick}
      // onMouseEnter={onClick}
      style={{ color: color }}
    >
      {text}
      {children}
    </button>
  );
};

// defalut props를 설정할 수 있다.
Button.defaultProps = {
  color: "blue",
};
export default Button;
