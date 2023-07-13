"use client";
import React from "react";
import Image from "next/image";
import { ShowcaseProps } from "../../types";
import { toast, Toaster } from "react-hot-toast";
interface CardProps {
  post: ShowcaseProps;
  index: number;
}
const ShowcaseCard = ({ post, index }: CardProps) => {
  const [showFullPrompt, setShowFullPrompt] = React.useState(false);
  const [showFullNegativePrompt, setShowFullNegativePrompt] =
    React.useState(false);

  const handleCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast.success("Copied to clipboard");
  };
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Define default options
          className: "",
          duration: 2000,
          style: {
            background: "#4b5563",
            color: "#fff",
            boxShadow: "none",
          },
        }}
      />
      <div
        key={index}
        className="relative overflow-hidden rounded-md cursor-pointer  group"
      >
        <Image
          src={post.imageUrl}
          alt={post.username}
          width={385}
          height={385}
          loading="lazy"
          className="transition-transform min-h-full h-[385px] object-cover object-center duration-300 transform hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 bg-primary bg-opacity-90 p-4 transition-transform duration-300 transform-gpu translate-y-full group-hover:translate-y-0">
          <span className="flex justify-between items-center">
            <h3 className="text-xl text-teal-500 font-bold mb-2">
              {post.username}
            </h3>
            <p className="text-xs text-white/50 font-semibold">
              {post.uploadedAt}
            </p>
          </span>
          <ul>
            <li className="border-b-2 border-teal-600  my-2">
              <p className="text-sm text-white">
                <span className="font-semibold">Model:</span> {post.model}
              </p>
            </li>
            <li className="border-b-2 border-teal-600 my-2 max-h-44 overflow-y-auto relative">
              <p className="text-sm text-white font-semibold">Prompt: </p>
              <Image
                src={"/clipboard.png"}
                alt="clip"
                width={15}
                height={15}
                className="absolute right-0 top-0 hover:scale-110"
                onClick={() => handleCopy(post.prompt)}
              />
              <p className="text-sm text-white">
                {showFullPrompt ? (
                  <>
                    {post.prompt}
                    <button
                      className="px-2 text-teal-500"
                      onClick={() => setShowFullPrompt(false)}
                    >
                      Show Less
                    </button>
                  </>
                ) : (
                  <>
                    {post.prompt.slice(0, 50)}
                    {post.prompt.length > 50 && "... "}
                    <button
                      className="px-2 text-teal-500"
                      onClick={() => setShowFullPrompt(true)}
                    >
                      Show All
                    </button>
                  </>
                )}
              </p>
            </li>
            <li className="border-b-2 border-teal-600 my-2 max-h-44 overflow-y-auto relative">
              <p className="text-sm text-white font-semibold">
                Negative Prompt:
              </p>
              <Image
                src={"/clipboard.png"}
                alt="clip"
                width={15}
                height={15}
                className="absolute right-0 top-0 hover:scale-110"
                onClick={() => handleCopy(post.negativePrompt)}
              />
              <p className="text-sm text-white ">
                {showFullNegativePrompt ? (
                  <>
                    {post.negativePrompt}
                    <button
                      className="px-2 text-teal-500"
                      onClick={() => setShowFullNegativePrompt(false)}
                    >
                      Show Less
                    </button>
                  </>
                ) : (
                  <>
                    {post.negativePrompt.slice(0, 50)}
                    {post.negativePrompt.length > 50 && "... "}
                    <button
                      className="px-2 text-teal-500"
                      onClick={() => setShowFullNegativePrompt(true)}
                    >
                      Show All
                    </button>
                  </>
                )}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShowcaseCard;
