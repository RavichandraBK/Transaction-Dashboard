import React from "react";
import { useContext } from "react";
import { PieChart, Pie, Legend, Cell } from "recharts";
import myContext from "../../Contexts/MyContext";

const PieCharts = () => {
  const { data, prompt } = useContext(myContext);

  const generateRandomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);
  const categoryColors = {};

  data.pieData.forEach((entry) => {
    if (!categoryColors[entry.category]) {
      categoryColors[entry.category] = generateRandomColor();
    }
  });
  return (
    <div>
      <div>
        <p className="text-5xl font-extrabold  leading-[3]">
          Pie Chart &#x00A0;-&#x00A0; {prompt.month}
        </p>
      </div>
      <div className="rounded-lg w-[700px] h-[450px] shadow-lg flex flex-col items-center justify-center">
        <PieChart width={700} height={400}>
          <Pie
            data={data.pieData}
            dataKey="items"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={categoryColors[entry.category]}
              />
            ))}
          </Pie>

          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default PieCharts;
