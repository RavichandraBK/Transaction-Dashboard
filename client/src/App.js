import { useState } from "react";
import Dashboard from "./Componets/Dashboard";
import myContext from "./Contexts/MyContext";
function App() {
  const [data, setData] = useState({
    tableData: [],
    statData: {},
    barData: [],
    pieData: [],
  });
  const [prompt, setPrompt] = useState({
    month: "March",
    searchText: "",
    pageNo: 1,
  });
  const [pageNav, setPageNav] = useState({
    prevPage: true,
    nextPage: true,
  });
  return (
    <div>
      <myContext.Provider
        value={{ data, setData, prompt, setPrompt, pageNav, setPageNav }}
      >
        <Dashboard />
      </myContext.Provider>
    </div>
  );
}

export default App;
