import React from "react";
import {
  XAxis,
  YAxis,
  Legend,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useContext } from "react";
import myContext from "../../Contexts/MyContext";

const BarCharts = () => {
  const { data, prompt } = useContext(myContext);

  return (
    <>
      <div>
        <div>
          <p className="text-5xl font-extrabold  leading-[3]">
            Bar Chart &#x00A0;-&#x00A0; {prompt.month}
          </p>
        </div>
        <div className="rounded-lg w-[700px] h-[450px] shadow-lg flex flex-col items-center justify-center">
          <BarChart width={600} height={400} data={data.barData}>
            <CartesianGrid horizontal={true} vertical={false} />
            <XAxis dataKey="name" angle={-45} dy={25} dx={-20} height={85} />

            <YAxis />
            <Bar dataKey="count" fill="#00BFFF" />
            <Tooltip />
            <Legend />
          </BarChart>
        </div>
      </div>
    </>
  );
};

export default BarCharts;
