import { createContext, useContext, useRef, useState } from "react";
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

const Son = (props) => {
  const sonMsg = "this is son msg";
  console.log("props", props);
  return (
    <div>
      click me!My is son{props.children}
      <button onClick={() => props.onGetSonMsg(sonMsg)}>send </button>
      <C></C>
    </div>
  );
};
const MsgContext = createContext();
const C = () => {
  const msg = useContext(MsgContext);

  return <div>this is C,{msg}</div>;
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

  const inputRef = useRef(null);
  const showDom = () => {
    console.log("inputRef", inputRef.current);
  };

  const getMsg = (msg) => {
    console.log("msg", msg);
    setMsg(msg);
  };
  const [msg, setMsg] = useState("");

  const appMsg = "this is app msg";

  return (
    <div className="App">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      this is app{count} {getName()} {new Date().getDate()}
      <br />
      <button onClick={showDom} style={{ color: "red" }}>
        this is red
      </button>
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
      {/* {Button()} */}
      <MsgContext.Provider value={appMsg}>
        <Son onGetSonMsg={getMsg} count={count}>
          <span>this is children,{msg}</span>
        </Son>
      </MsgContext.Provider>
    </div>
  );
};

export default App;
