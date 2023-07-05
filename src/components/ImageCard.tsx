import React from "react";
import { DiffussionResponse } from "../../types";
import PostModal from "./PostModal";
import axios from "axios";
import Image from "next/image";

interface ImageCardProps {
  image: DiffussionResponse;
}
const ImageCard = async ({ image }: ImageCardProps) => {
  async function fetchQueue(id: number) {
    const response = await axios.post(
      `https://stablediffusionapi.com/api/v3/fetch/${id}`,
      { key: process.env.DIFFUSSION_API_SECRET },
      { headers: { "Content-Type": "application/json" } }
    );
    return response?.data?.output?.[0];
  }
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
  let { output, prompt, negativePrompt, error, model, status, id } = image;
  let isLoading = false;
  if (status === "processing") {
    isLoading = true;
    output = await fetchQueue(id);
    isLoading = false;
    status = "success";
  }
  return (
    <div className="grid place-items-center  xl:flex gap-3 ">
      {isLoading ? (
        <div className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4  xl:m-0  h-image-sm w-image-sm  xl:w-image-lg  xl:h-image-lg">
          Processing...
        </div>
      ) : (
        <Image
          className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4  xl:m-0  h-image-sm w-image-sm  xl:w-image-lg  xl:h-image-lg"
          src={output}
          width={512}
          height={512}
          alt="Image Preview"
        />
      )}
      {!output && (
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
