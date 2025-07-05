import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { countOperation } from "../feautures/counter/counterSlice";

function Counter() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.counter.value);
  return (
    <div className="Counter">
      <div style={{ textAlign: "left", paddingLeft: "1rem", color: "red" }}>
        Task 2 !
      </div>
      Number:
      <div>{value}</div>
      <button className="button2" onClick={() => dispatch(countOperation())}>
        click to count!
      </button>
    </div>
  );
}

export default Counter;
