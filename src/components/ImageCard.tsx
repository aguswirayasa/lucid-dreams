"use client";
import React from "react";
import { DiffussionResponse } from "../../types";
import PostModal from "./PostModal";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface ImageCardProps {
  image: DiffussionResponse;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [output, setOutput] = useState<string>(image?.output || "/loading.jpg");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchQueue = async (id: number) => {
    setIsLoading(true);

    while (true) {
      try {
        const response = await axios.post(
          "/api/queue",
          { id },
          { headers: { "Content-Type": "application/json" } }
        );
        const result = response?.data?.output;
        const newStatus = response?.data?.status;
        setOutput(result);
        if (newStatus !== "processing") {
          break;
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong. Please try again.");
        setIsLoading(false);
        break;
      }

      // Delay for 20 seconds (20000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 20000));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (image && image.status === "processing") {
      fetchQueue(image.id);
    } else {
      setIsLoading(false);
    }
  }, [image]);

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
            <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full  xl:max-w-xs  xl:w-80 shadow-md">
              {" "}
              <p>Seed:</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  let { prompt, negativePrompt, error, model, seed } = image;

  return (
    <div className="grid place-items-center  xl:flex gap-3 ">
      {isLoading ? (
        <div className="bg-gray-700 grid place-items-center text-2xl border-2 text-center border-teal-400 m-4 xl:m-0 h-image-sm w-image-sm xl:w-image-lg xl:h-image-lg animate-pulse">
          Your image is still processing, high quality image might take sometime
          to finish
          <span className="loader"></span>
        </div>
      ) : errorMessage ? (
        <div className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4 xl:m-0 h-image-sm w-image-sm xl:w-image-lg xl:h-image-lg ">
          Something went wrong, please try again.
        </div>
      ) : (
        <Image
          className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4 xl:m-0 w-[512px] lg:max-w-3xl"
          src={output}
          width={768}
          height={512}
          alt="Image Preview"
        />
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
                <b>Seed:</b> {seed}
              </p>
            </li>
            <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full xl:max-w-xs xl:w-80 shadow-md">
              <p>
                <b>Prompt:</b>{" "}
                {prompt.length > 50 ? (
                  <>
                    {prompt.slice(0, 50)}
                    <span>
                      ...{" "}
                      <button
                        onClick={() => {
                          // Handle the "View More" click event
                          console.log("View More clicked");
                        }}
                        className="text-teal-400 underline cursor-pointer"
                      >
                        View More
                      </button>
                    </span>
                  </>
                ) : (
                  prompt
                )}
              </p>
            </li>
            <li className="mb-3 bg-gray-800 rounded-md border-2 border-teal-400 p-3 w-full xl:max-w-xs xl:w-80 shadow-md">
              <p>
                <b>Negative Prompt:</b>{" "}
                {negativePrompt.length > 50 ? (
                  <>
                    {negativePrompt.slice(0, 50)}
                    <span>
                      ...{" "}
                      <button
                        onClick={() => {
                          // Handle the "View More" click event
                          console.log("View More clicked");
                        }}
                        className="text-teal-400 underline cursor-pointer"
                      >
                        View More
                      </button>
                    </span>
                  </>
                ) : (
                  negativePrompt
                )}
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
