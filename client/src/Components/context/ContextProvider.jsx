import React, { useState } from "react";
import { createContext } from "react";

export const addData = createContext();
export const updateData = createContext();
export const deleteData = createContext();

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [update, setUpdate] = useState("");
  const [deletedata, setDeleteData] = useState("");

  return (
    <>
      <addData.Provider value={{ userData, setUserData }}>
        <updateData.Provider value={{ update, setUpdate }}>
          <deleteData.Provider value={{ deletedata, setDeleteData }}>
            {children}
          </deleteData.Provider>
        </updateData.Provider>
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
