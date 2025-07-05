import { Provider } from "react-redux";
import "./App.css";
import Counter from "./components/Counter";
import Todo from "./components/Todo";
import store from "./feautures/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <h2>
          Hi, This is a simple app for todo list. <br /> It is a practice for
          redux toolkit. <br />
          Remote state and local state.
        </h2>
        <Todo />
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
