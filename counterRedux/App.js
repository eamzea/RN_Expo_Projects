import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import MyApp from "./src/MyApp";

const initState = {
  myCounter: 0,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "INC_COUNTER":
      return { myCounter: state.myCounter + 1 };
    case "DEC_COUNTER":
      if (state.myCounter >= 1) {
        return { myCounter: state.myCounter - 1 };
      } else {
        return state;
      }
  }

  return state;
};

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
};

export default App;
