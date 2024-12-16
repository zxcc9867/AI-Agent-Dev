const Button = ({ text, color, children }) => {
  console.log(text, color);
  return (
    <button style={{ color: color }}>
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
