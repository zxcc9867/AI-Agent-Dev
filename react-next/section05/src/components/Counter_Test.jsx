import { useState } from "react";

function Counter_Test() {
  const [value, setValue] = useState(0);
  const onClick = () => {
    setValue(value + 1);
  };
  return (
    <div>
      <button onClick={onClick}>+1</button>
      {value}
    </div>
  );
}

export default Counter_Test;
