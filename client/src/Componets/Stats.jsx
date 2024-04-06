import React, { useContext } from "react";
import myContext from "../Contexts/MyContext";

const Stats = () => {
  const { data , prompt,  } = useContext(myContext);
  return (
    <>
      <div className="w-full flex justify-center  mt-5">
        <div className="w-2/6">
          <div>
            <p className="text-5xl font-extrabold  leading-[3]">
              Statistics &#x00A0;-&#x00A0; {prompt.month}
            </p>
          </div>
          <div className="rounded-3xl bg-yellow-300 w-full h-36 flex flex-col justify-center ">
            <div className="flex justify-around">
              <p className="text-lg w-56 text-left">Total sale Amount</p>
              <p className="text-lg w-24 text-end">
                {data.statData.totalSaleAmount}
              </p>
            </div>
            <div className="flex justify-around">
              <p className="text-lg w-56 text-left">Total sold items</p>
              <p className="text-lg w-24 text-end">
                {data.statData.totalSoldItems}
              </p>
            </div>
            <div className="flex justify-around">
              <p className="text-lg w-56 text-left">Total not sold items</p>
              <p className="text-lg w-24 text-end">
                {data.statData.totalNotSoldItems}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
