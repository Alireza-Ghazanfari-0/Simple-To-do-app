import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  addAsyncData,
  deleteAsyncData,
  getAsyncData,
  toggleAsyncData,
} from "../feautures/todo/toDoSlice";

function Todo() {
  const [titleValue, setTitleValue] = useState("");

  const { todo, loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAsyncData());
  }, [dispatch]);

  // console.log(todo);

  return (
    <div className="todo-container">
      <div
        style={{
          textAlign: "left",
          //   paddingRight: "1rem",
          color: "red",
        }}
      >
        Task 1 !
      </div>
      <form
        className="form-title"
        onSubmit={(e) => {
          e.preventDefault();
          if (!titleValue) return;
          dispatch(addAsyncData(titleValue));
          setTitleValue("");
        }}
      >
        <label htmlFor="todo-title"> To Do Title:</label>
        <div className="input-and-button">
          <input
            className="input-todo"
            type="text"
            name="todo-title"
            id="todo-title"
            placeholder="enter title of work"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <button className="button1">Set Title</button>
        </div>
      </form>
      <div className="todo-list">
        <div>ToDo List:</div>
        {loading ? (
          <p>loading data ...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="todo-items-0">
            {todo.map((item) => (
              <div className="todo-items" key={item.id}>
                <div className="first-item">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {
                      // e.preventDefault();
                      dispatch(
                        toggleAsyncData({
                          id: item.id,
                          completed: !item.completed,
                        })
                      );
                    }}
                  />
                </div>
                <div className="second-item"> {item.title} </div>
                <div
                  className="third-item"
                  onClick={() => {
                    // e.preventDefault();
                    dispatch(deleteAsyncData({ id: item.id }));
                    console.log({ id: item.id });
                  }}
                >
                  delete
                  <TiDelete
                    style={{
                      color: "red",
                      height: "20px",
                      width: "20px",
                      verticalAlign: "middle",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
