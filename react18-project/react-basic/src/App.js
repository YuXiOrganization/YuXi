import { useState } from "react";
import "./index.css";
const count = 100;

const getName = () => {
  return "MyName";
};
const list = [
  { id: 1, name: "react" },
  { id: 2, name: "vue" },
];

const isLogin = true;

const articleType = 1;
const getArticleTem = () => {
  if (articleType === 0) {
    return <div>my is no image article</div>;
  } else if (articleType === 1) {
    return <div>my is only one image type</div>;
  }
};

const Button = () => {
  return <button>click me!</button>;
};

const App = () => {
  const handleClick = (val, e) => {
    // console.log("button clicked", val, e);
    setCounts(counts + 1);
    setForm({ ...form, name: "vue" });
  };
  const [form, setForm] = useState({ name: "jack" });
  const [counts, setCounts] = useState(0);
  const style = {
    color: "red",
    fontSize: "50px",
  };
  const setClassName = () => {
    return "active";
  };

  const [value, setValue] = useState("");

  return (
    <div className="App">
      <input value={value} onChange={(e) => setValue(e.target.value)}></input>
      this is app{count} {getName()} {new Date().getDate()}
      <div style={{ color: "red" }}>this is red</div>
      <div style={style}>
        {list.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <div className="foo">
        {/* 逻辑与&& */}
        {isLogin && <span>this is span</span>}
        {isLogin ? <span>jack</span> : <span>loading...</span>}
      </div>
      <div className={setClassName()}>{getArticleTem()}</div>
      <button onClick={($event) => handleClick("jack", $event)}>
        this is button{counts}
        {form.name}
      </button>
      {Button()}
      <Button></Button>
    </div>
  );
};

export default App;
