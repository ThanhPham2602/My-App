import { createContext, useReducer } from "react";
import { redirect } from "react-router-dom";
// import App from "./App";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const initList = [
    { id: 0, SĐT: 123, first: "hello", last: "say", twitter: "@áda" },
    { id: 1, SĐT: 234, first: "hi", last: "sthg", twitter: "@áda" },
    { id: 2, SĐT: 34234, first: "akjsd", last: 2, twitter: "@áda" },
  ];

  function createContact(state) {
    const newState = [...state];
    const demo = {
      id: Math.random(),
      first: "",
      last: "",
    };
    newState.unshift(demo);
    redirect(`/contacts/${demo.id}/edit`);
    return newState;
  }

  function saveUpdateContact(state, action) {
    const number = parseFloat(action.payload.id);

    const index = state.findIndex((value) => value.id === number);
    const newState = [...state];
    console.log("payload:", number);
    // console.log("payload", typeof number);

    newState[index] = { ...action.payload, id: number };

    console.log("action.pau", action.payload);
    console.log("action.pau:", typeof action.payload);
    console.log("action.pau:: ", newState);
    redirect(`contacts/${number}`);
    return newState;
    //Object.Assign(): thay thế từng phần
  }

  function deleteContact(state, action) {
    const index = state.findIndex((val) => val.id === action.payload.id);
    console.log("delete ind", index);
    // state.map((val) => console.log("id: ", val.first));
    //   console.log("state data ", state);
    //   console.log("data ", state.slice(index + 1, state.length));

    //   redirect("/");
    //   return state.slice(index + 1, state.length);
    // }
    console.log("state data ", state);
    state.splice(index, 1);
    console.log("state: ", state);
    // const newState = [...state];
    // console.log("newState.splice(index, 1)", state.splice(index, 1));
    redirect("/");
    return state;
  }

  const userReducer = (state, action) => {
    // console.log("state: : : ", state);
    // console.log("object action", action);
    switch (action.type) {
      // case "loader":
      //   return getContacts(state, action);
      case "create":
        return createContact(state, action);
      case "save":
        return saveUpdateContact(state, action);
      case "delete":
        return deleteContact(state, action);
      default:
        return [];
    }
  };
  const [list, dispatch] = useReducer(userReducer, initList);
  return (
    <AppContext.Provider value={{ dispatch, list: list }}>
      {children}
    </AppContext.Provider>
  );
};
