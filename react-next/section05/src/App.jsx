import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Button from "./components/Button";
function App() {
  const buttonProps ={
    text : "메일",
    a:1,
    b:2,
    c:3
  }
  return (
    <>
      <Button {...buttonProps}  /> 
      <Button text={"미유"} color={"yellow"} />
      <Button text={"원진"} color={"purple"} />
      <Button text={"게임로그아웃"} color={"red"} >
        <div>자식요소</div>
        <Header></Header>
      </Button>
    </>
  );
}

export default App;
