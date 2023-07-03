import React from "react";
import PromptForm from "../../components/PromptForm";
const Loading = () => {
  return (
    <div className="grid place-items-center place-content-center min-h-screen">
      <div className="grid place-items-center grid-cols-12 border-2 border-teal-400  place-content-center p-10 gap-5 rounded-md">
        <div className="grid col-span-8 place-items-center gap-3">
          <div className="flex gap-3">
            <div
              style={{ height: "512px", width: "512px" }}
              className="bg-gray-700 "
            ></div>

            <ul>
              <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 max-w-xs w-80 shadow-md">
                <p></p>
              </li>
              <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 max-w-xs w-80 shadow-md">
                <p></p>
              </li>
              <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 max-w-xs w-80 shadow-md">
                {" "}
                <p></p>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-4 border-s-2 border-teal-400 p-3 w-full">
          <div className="bg-gray-700 h-80 w-80"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
