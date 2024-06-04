import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import EmployeeApp from "./src/EmployeeApp";

const initalState = {
  1: {
    empId: 1,
    empName: "Employee One",
    empSalary: 10000,
  },
  2: {
    empId: 2,
    empName: "Employee Two",
    empSalary: 20000,
  },
  3: {
    empId: 3,
    empName: "Employee Three",
    empSalary: 30000,
  },
  4: {
    empId: 4,
    empName: "Employee Four",
    empSalary: 40000,
  },
  5: {
    empId: 5,
    empName: "Employee Five",
    empSalary: 50000,
  },
};

const reducer = (state = initalState, action) => {
  let initialSalary;
  let increment;
  let newSalary;
  let employeeObject;

  if (action.id) {
    initialSalary = state[action.id].empSalary;
    increment = (initialSalary / 100) * 20;
  }

  switch (action.type) {
    case "GOOD_PERFORMANCE":
      newSalary = initialSalary + increment;
      employeeObject = state[action.id];
      employeeObject.empSalary = newSalary;
      return Object.assign({}, state);
    case "BAD_PERFORMANCE":
      newSalary = initialSalary - increment;
      employeeObject = state[action.id];
      employeeObject.empSalary = newSalary;
      return Object.assign({}, state);
  }

  return state;
};

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <EmployeeApp />
    </Provider>
  );
};

export default App;
