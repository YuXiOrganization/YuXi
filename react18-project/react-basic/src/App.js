const count = 100;

const getName = () => {
  return "MyName";
};
const list = [
  { id: 1, name: "react" },
  { id: 2, name: "vue" },
];

const App = () => {
  return (
    <div className="App">
      this is app{count} {getName()} {new Date().getDate()}
      <div style={{ color: "red" }}>this is red</div>
      <div>
        {list.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
