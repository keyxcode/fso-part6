import { createContext, useReducer, useContext } from "react";

const notiReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTI":
      return action.payload;
    default:
      return state;
  }
};

const NotiContext = createContext();

export const NotiContextProvider = (props) => {
  const [noti, notiDispatch] = useReducer(notiReducer, "");

  return (
    <NotiContext.Provider value={[noti, notiDispatch]}>
      {props.children}
    </NotiContext.Provider>
  );
};

export default NotiContext;
