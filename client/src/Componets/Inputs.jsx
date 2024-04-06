import React, { useEffect, useState } from "react";
import myContext from "../Contexts/MyContext";
import { useContext } from "react";
import { TableData as table } from "../apis/products";
import { CombinedData } from "../apis/products";
const Inputs = () => {
  const { setData, prompt, setPrompt, setPageNav } = useContext(myContext);

  useEffect(() => {
    const fetchData = async () => {
      const tdata = await table(prompt);

      const combinedData = await CombinedData(prompt.month);
      const combData = combinedData.data.combinedData;
      if (tdata && tdata.data) {
        setData((prev) => ({
          ...prev,
          tableData: [...tdata.data.items],
          statData: { ...combData.stats },
          barData: [...combData.barChartData],
          pieData: [...combData.pieChartData],
        }));
        setPageNav((prev) => ({
          ...prev,
          prevPage: tdata.data.hasPrevPage,
          nextPage: tdata.data.hasNextPage,
        }));
      }
    };
    fetchData();
  }, [prompt.month, prompt.searchText]);
  const handleSelect = (e) => {
    setPrompt((prev) => ({ ...prev, month: e.target.value }));
  };
  const handleSearch = (e) => {
    setPrompt((prev) => ({ ...prev, searchText: e.target.value }));
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-11/12 flex justify-between">
          <div className="w-56 h-14  ">
            <input
              type="text"
              className="w-full h-full rounded-3xl bg-yellow-300 text-lg pl-6 cursor-pointer"
              placeholder="Search"
              value={prompt.searchText}
              onChange={handleSearch}
            />
          </div>
          <div className="w-56 h-14 ">
            <select
              name=""
              id=""
              className="w-full h-full text-lg rounded-xl text-center cursor-pointer bg-yellow-300"
              defaultValue={"March"}
              onChange={handleSelect}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="Septemper">Septemper</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inputs;
