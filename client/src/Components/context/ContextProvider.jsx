import React, { useState } from "react";
import { createContext } from "react";

export const addData = createContext();
export const updateData = createContext();


const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [update, setUpdate] = useState("");

  return (
    <>
      <addData.Provider value={{ userData, setUserData }}>
        <updateData.Provider value={{update, setUpdate  }}>
        {children}
        </updateData.Provider>
       
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
