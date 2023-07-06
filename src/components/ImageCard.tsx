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

const ImageCard = async ({ image }: ImageCardProps) => {
  const [output, setOutput] = useState(image?.output || "/loading.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (image && image.status === "processing") {
      axios
        .post(
          "/api/queue",
          { id: image?.id },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((result) => {
          setOutput(result?.data?.output?.[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error);
          setIsLoading(false);
        });
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
          </ul>
        </div>
      </div>
    );
  }

  let { prompt, negativePrompt, error, model, status, id } = image;

  return (
    <div className="grid place-items-center  xl:flex gap-3 ">
      {isLoading ? (
        <div className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4 xl:m-0 h-image-sm w-image-sm xl:w-image-lg xl:h-image-lg animate-pulse">
          Your image is still processing, high quality image might take sometime
          to finish
        </div>
      ) : errorMessage ? (
        <div className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4 xl:m-0 h-image-sm w-image-sm xl:w-image-lg xl:h-image-lg ">
          Something went wrong, please try again.
        </div>
      ) : (
        <Image
          className="bg-gray-700 grid place-items-center text-2xl border-2 border-teal-400 m-4 xl:m-0 h-image-sm w-image-sm xl:w-image-lg xl:h-image-lg"
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
