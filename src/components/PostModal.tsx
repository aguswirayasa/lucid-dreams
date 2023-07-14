"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { convertToBase64, postImage } from "../../utils";
import PostToast from "./PostToast";
import { PostModalProps } from "../../types";
import { toast } from "react-hot-toast";
const PostModal = ({
  output,
  prompt,
  negativePrompt,
  model,
}: PostModalProps) => {
  const [username, setUsername] = useState("");
  const [apiData, setApiData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiDataReceived, setApiDataReceived] = useState(false);
  const handleButtonClick = async () => {
    setApiDataReceived(false);
    setIsLoading(true);
    let image = "";
    try {
      if (output) {
        image = await convertToBase64(output);
      }
      const post = {
        username: username,
        imageUrl: image,
        prompt: prompt,
        negativePrompt: negativePrompt,
        model: model,
      };
      const data = await postImage(post);
      setApiData(data);
      setApiDataReceived(true);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          disabled={isLoading}
          className="text-violet w-full  hover:bg-teal-700 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-teal-500 px-[15px] font-medium leading-none"
        >
          {isLoading ? (
            <div className="grid col-span-8 place-items-center gap-3">
              <div className="flex gap-3">
                <p className="loading-text">
                  Posting<span className="loading-ellipsis"></span>
                </p>
              </div>
            </div>
          ) : (
            "Post to Community"
          )}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-4/5 lg:w-2/4 xl:w-2/5 border-2 border-teal-600   translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-800 p-[25px]  focus:outline-none">
          <Dialog.Title className="text-xl m-0 text-[17px] font-bold">
            Post Image
          </Dialog.Title>
          <Dialog.Description className="text-base font-medium  leading-normal border-teal-700 border-b-2 pb-3">
            Enter your desired username to share your dreams with other!
          </Dialog.Description>

          <div className="grid place-items-center  w-full md:w-4/5 xl:w-full text-left">
            <label className="w-full font-bold my-3">Username</label>
            <input
              className="text-white p-3 bg-gray-700 rounded-md drop-shadow-md  w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={handleButtonClick}
                className="bg-teal-500 px-6 hover:bg-teal-700  inline-flex h-[35px] items-center justify-center rounded-[4px]  font-medium leading-none "
              >
                Post
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
      {apiDataReceived && (
        <PostToast
          open={apiDataReceived}
          setOpen={setApiDataReceived}
          data={apiData}
        />
      )}
    </Dialog.Root>
  );
};

export default PostModal;
