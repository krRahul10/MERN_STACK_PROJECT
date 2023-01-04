import React, { useState } from "react";
import { createContext } from "react";

export const addData = createContext();
const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  return (
    <>
      <addData.Provider value={{ userData, setUserData }}>
        {children}
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
