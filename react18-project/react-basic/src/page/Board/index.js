import { useReducer } from "react";

const Board = () => {
  console.log("create Board")
  const reducer = (stateBoard, action) => {
    switch (action.type) {
      case "INC":
        return stateBoard + 1;
      case "DEC":
        return stateBoard - 1;
      default:
        return stateBoard;
    }
  };

  const [stateBoard, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <div>{stateBoard}</div>
      <button onClick={()=>dispatch({ type: "INC" })}>ADD+++</button>
      <button onClick={()=>dispatch({ type: "DEC" })}>DEC---</button>
      this is Board
    </div>
  );
};

export default Board;
