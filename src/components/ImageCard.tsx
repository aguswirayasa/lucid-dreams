import React from "react";
import { DiffussionResponse } from "../../types";
import PostModal from "./PostModal";

interface ImageCardProps {
  image: DiffussionResponse;
}
const ImageCard = ({ image }: ImageCardProps) => {
  if (!image) {
    // Handle the case where image is null
    return (
      <div className="grid   xl:col-span-8 place-items-center gap-3">
        <div className="flex flex-col  xl:flex-row gap-3 justify-items-center">
          <div className="bg-gray-700 grid place-items-center text-2xl m-4  xl:m-0  h-image-sm w-image-sm  xl:w-image-lg  xl:h-image-lg">
            Image Preview
          </div>

          <ul>
            <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full  xl:max-w-xs  xl:w-80 shadow-md">
              <p>Prompt:</p>
            </li>
            <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full  xl:max-w-xs  xl:w-80 shadow-md">
              <p>Negative Prompt:</p>
            </li>
            <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full  xl:max-w-xs  xl:w-80 shadow-md">
              {" "}
              <p>Model:</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  const { output, links, prompt, negativePrompt, error, model } = image;
  const isOutputEmpty = output === "" ? true : false;
  return (
    <div className="grid place-items-center  xl:flex gap-3 ">
      {links && (
        <img
          className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4  xl:m-0  h-image-sm w-image-sm  xl:w-image-lg  xl:h-image-lg"
          src={links}
          alt="Image Preview"
        />
      )}
      {output && (
        <img
          className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4  xl:m-0  h-image-sm w-image-sm  xl:w-image-lg  xl:h-image-lg"
          src={output}
          alt="Image Preview"
        />
      )}
      {!output && !links && (
        <div className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4  xl:m-0  h-image-sm w-image-sm  xl:w-image-lg  xl:h-image-lg">
          Image Preview
        </div>
      )}

      <ul>
        {error ? (
          <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full  xl:max-w-xs  xl:w-80 shadow-md">
            <p>{error}</p>
          </li>
        ) : (
          <>
            <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full  xl:max-w-xs  xl:w-80 shadow-md">
              <p>
                <b>Model:</b> {model}
              </p>
            </li>
            <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full  xl:max-w-xs  xl:w-80 shadow-md">
              <p>
                <b>Prompt:</b> {prompt}
              </p>
            </li>
            <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full  xl:max-w-xs  xl:w-80 shadow-md">
              <p>
                <b>Negative Prompt:</b> {negativePrompt}
              </p>
            </li>
            <li className="mb-3  p-3 w-full  xl:max-w-xs  xl:w-80 ">
              <PostModal
                links={links}
                model={model}
                negativePrompt={negativePrompt}
                output={output}
                prompt={prompt}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ImageCard;
