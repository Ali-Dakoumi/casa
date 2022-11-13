import React, { createContext, useState } from "react";

const DataContext = createContext(null);

function DataProvider({ children }) {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ setData, data }}>
      {children}
    </DataContext.Provider>
  );
}
export { DataProvider, DataContext };
