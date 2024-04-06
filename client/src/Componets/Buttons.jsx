import React, { useContext } from "react";
import myContext from "../Contexts/MyContext";

const Buttons = () => {
  const { prompt, setPrompt, pageNav } = useContext(myContext);
  return (
    <>
      <div>
        <div className="w-full flex justify-around mt-8">
          <div className="w-36 h-12 bg-white shadow-lg flex items-center rounded-xl">
            <p className="text-center text-xl font-bold w-full">
              Page = {prompt.pageNo}
            </p>
          </div>
          <div className="flex justify-evenly w-6/12">
            <button
              className={`text-center font-bold bg-purple-500 rounded-xl w-40 text-lg h-12 ${
                pageNav.hasPrevPage ? "opacity-100" : "opacity-30"
              }`}
              disabled={pageNav.hasPrevPage ? 0 : 1}
              onClick={() => {
                setPrompt((prev) => ({ ...prev, pageNo: prev.pageNo - 1 }));
              }}
            >
              &#x27F5;&#x00A0;&#x00A0;Previous
            </button>
            <button
              className={`text-center font-bold bg-purple-500 rounded-xl w-40 text-lg h-12 ${
                pageNav.hasNextPage ? "opacity-100" : "opacity-30"
              }`}
              disabled={pageNav.hasNextPage ? 0 : 1}
              onClick={() => {
                setPrompt((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
              }}
            >
              Next&#x00A0;&#x00A0;&#x27F6;
            </button>
          </div>
          <div className="w-36 h-12 bg-white shadow-lg flex items-center rounded-xl">
            <p className="text-center text-xl font-bold w-full">
              Per Page = 10
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buttons;
