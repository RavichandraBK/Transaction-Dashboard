import React, { useContext } from "react";
import myContext from "../Contexts/MyContext";

const Table = () => {
  const { data } = useContext(myContext);
  return (
    <>
      <div className="flex justify-center">
        <div className="rounded-3xl w-11/12 max-h-[500px] overflow-y-scroll  mt-10 flex justify-center shadow-2xl">
          <table className="w-full h-full rounded-3xl overflow-hidden">
            <thead className="bg-yellow-500 h-10">
              <tr>
                <th className="border-r-2 border-b-2 border-collapse border-black w-16">
                  ID
                </th>
                <th className="border-r-2 border-b-2 border-collapse border-black">
                  TITLE
                </th>
                <th
                  className="border-r-2 border-b-2 border-collapse border-black"
                  rowSpan={5}
                >
                  DESCRIPTION
                </th>
                <th className="border-r-2 border-b-2 border-collapse border-black">
                  PRICE
                </th>
                <th className="border-r-2 border-b-2 border-collapse border-black">
                  SOLD
                </th>
                <th className="border-r-2 border-b-2 border-collapse border-black">
                  CATEGORY
                </th>
                <th className="border-r-2 border-b-2 border-collapse border-black w-40">
                  IMAGE
                </th>
              </tr>
            </thead>
            <tbody>
              {data.tableData && data.tableData.length > 0 ? (
                data.tableData.map((item) => (
                  <tr key={item.id} className="text-center bg-yellow-500">
                    <td className="border-r-2 border-t-2 border-collapse border-black">
                      {item.id}
                    </td>
                    <td className="border-r-2 border-t-2 border-collapse border-black">
                      {item.title}
                    </td>
                    <td className="border-r-2 border-t-2 border-collapse border-black text-left">
                      {item.description}
                    </td>
                    <td className="border-r-2 border-t-2 border-collapse border-black">
                      {item.price}
                    </td>
                    <td className="border-r-2 border-t-2 border-collapse border-black">
                      {item.sold ? "Yes" : "No"}
                    </td>
                    <td className="border-r-2 border-t-2 border-collapse border-black">
                      {item.category}
                    </td>
                    <td
                      className={`border-r-2 border-t-2 border-collapse border-black text-center flex justify-center bg-white w-full h-full items-center`}
                    >
                      <img src={item.image} alt="" width={60} height={60} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center w-full bg-yellow-500 text-xl">
                  <th
                    colSpan={7}
                    className="border-r-2 border-t-2 border-collapse border-black"
                  >
                    No Transaction Found
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
