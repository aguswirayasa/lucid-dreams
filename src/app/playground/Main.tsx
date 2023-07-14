"use client";
import React, { Suspense, useState } from "react";
import PromptForm from "../../components/PromptForm";
import { useSelector } from "react-redux";
import ImageCard from "../../components/ImageCard";
import { RootState } from "../store/promptSlice";
const Main = () => {
  const { data, error } = useSelector((state: RootState) => state.prompt);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);
  };
  const handleFinishLoading = () => {
    setIsLoading(false);
  };
  return (
    <div className="grid place-items-center  min-h-screen">
      <div className="flex flex-wrap justify-items-center  xl:grid xl:place-items-center xl:grid-cols-12 border-2 border-teal-400  xl:place-content-center xl:p-10 gap-5 rounded-md w-full xl:w-fit">
        <div className="grid w-full  xl:col-span-8 place-items-center gap-3">
          {isLoading ? (
            <>
              <div className="grid xl:col-span-8 place-items-center gap-3 animate-pulse">
                <div className="flex gap-3">
                  <div className="bg-gray-700 loading-animation grid place-items-center text-center h-image-sm w-image-sm xl:w-image-lg xl:h-image-lg">
                    Loading...
                    <span className="loader"></span>
                  </div>

                  <ul>
                    <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full xl:max-w-xs xl:w-80 shadow-md loading-animation"></li>
                    <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full xl:max-w-xs xl:w-80 shadow-md loading-animation"></li>
                    <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full xl:max-w-xs xl:w-80 shadow-md loading-animation"></li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              {error && <p>{error}</p>}
              <ImageCard image={data} />
            </>
          )}
        </div>
        <div className="lg:col-span-4 xl:border-s-2 border-teal-400 p-3 w-full">
          <PromptForm
            startLoading={handleLoading}
            finishLoading={handleFinishLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
