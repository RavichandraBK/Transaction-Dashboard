import React from "react";
import Table from "./Table";
import Inputs from "./Inputs";
import Buttons from "./Buttons";
import Stats from "./Stats";
import BarCharts from "./Charts/BarCharts";

import PieCharts from "./Charts/PieCharts";

const Dashboard = () => {
  return (
    <>
      <div className="w-full h-fit flex items-center justify-center">
        <div className="rounded-full  w-56 h-56 bg-white flex items-center justify-center shadow-xl">
          <p className="text-3xl text-center font-extrabold text-black">
            Transaction Dashboard
          </p>
        </div>
      </div>
      <Inputs />
      <Table />
      <Buttons />
      <Stats />
      <div className="flex justify-evenly w-full mb-10">
        <BarCharts />
        <PieCharts />
      </div>
    </>
  );
};

export default Dashboard;
