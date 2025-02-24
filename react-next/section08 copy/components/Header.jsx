const Header = () => {
  return (
    <div className="Header">
      <h3>TO DO LIST 😊 </h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

export default Header;
