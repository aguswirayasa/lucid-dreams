"use client";
import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setData, setError } from "../app/store/promptSlice";
import { useMutation } from "react-query";
import { randoms, ApiModels, sizes } from "../../libs/data";
import Image from "next/image";
import toast from "react-hot-toast";

type FormData = {
  prompt: string;
  negativePrompt: string;
  seed: string;
  model: string;
  size: string;
};

const PromptForm = ({ startLoading, finishLoading }: any) => {
  const { register, handleSubmit, setValue, formState } = useForm<FormData>();
  const [prompt, setPrompt] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState({
    name: "meinapastel",
    url: "https://res.cloudinary.com/drqn4yupq/image/upload/v1689260778/U2zJ0M5q_2x_wub4wu.png",
  });
  const dispatch = useDispatch();
  const handleRandomize = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const selectedModel = randoms[randomNumber - 1];
    setPrompt(selectedModel.prompt);
    setNegativePrompt(selectedModel.negative);
    setValue("prompt", selectedModel.prompt);
    setValue("negativePrompt", selectedModel.negative);
    toast.success("Prompt Generated");
  };

  const mutation = useMutation(
    (data: FormData) =>
      fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        return response.json();
      }),
    {
      onSuccess: (responseData) => {
        finishLoading();
        dispatch(setData(responseData));
        dispatch(setError(null));
      },
      onError: (error: any) => {
        finishLoading();
        dispatch(setError(error.message));
      },
      onMutate: () => {
        startLoading();
      },
    }
  );

  const handleGenerate = handleSubmit((data: FormData) => {
    mutation.mutate(data);
  });

  const handleOnChange = (name: string, url: string) => {
    setSelectedModel({
      name,
      url,
    });
  };

  return (
    <div className="grid gap-3 max-h-[500px] overflow-y-auto">
      <form
        onSubmit={handleGenerate}
        className="flex justify-center items-center flex-col gap-3 w-full "
      >
        <div className="grid place-items-center w-full md:w-4/5 xl:w-full text-left">
          <label className="w-full font-bold">Prompt</label>
          <textarea
            {...register("prompt", { required: true })}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-white p-3 bg-gray-800 rounded-md drop-shadow-md w-full"
            style={{ height: "200px" }}
          />
        </div>
        <div className="grid place-items-center w-full md:w-4/5 xl:w-full text-left">
          <label className="w-full font-bold">Negative Prompt</label>
          <textarea
            {...register("negativePrompt", { required: true })}
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="text-white p-3 bg-gray-800 rounded-md drop-shadow-md w-full"
            style={{ height: "200px" }}
          />
        </div>
        <div className="grid place-items-center w-full md:w-4/5 xl:w-full text-left">
          <label className="w-full font-bold">Size</label>
          <select
            {...register("size", { required: true })}
            className="text-white p-3 bg-gray-800 rounded-md drop-shadow-md w-full font-sans"
          >
            {sizes.map((size, index) => {
              return (
                <option key={index} value={size.value}>
                  {size.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="grid gap-3">
          <label className="w-full font-bold">Model</label>
          <span className="w-full bg-gray-600 rounded-lg p-3 flex justify-start items-center gap-3">
            <Image
              src={selectedModel.url}
              width={65}
              height={65}
              loading="eager"
              alt={selectedModel.name}
              className="rounded-lg"
            />
            <p className="text-lg font-bold">{selectedModel.name}</p>
          </span>
          <div className="flex flex-wrap w-full justify-start gap-4">
            {ApiModels.map((model) => (
              <label
                key={model.id}
                className="flex flex-col items-center max-w-[110px] mx-2"
              >
                <Image
                  src={model.imageUrl}
                  alt={model.name}
                  width={65}
                  height={65}
                  loading="eager"
                  className="rounded-lg"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("model", { required: true })}
                    value={model.id}
                    defaultChecked={true}
                    defaultValue={"meinapastel"}
                    onClick={() => handleOnChange(model.name, model.imageUrl)}
                  />
                  <span className="text-sm">{model.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="grid place-items-center w-full md:w-4/5 xl:w-full text-left">
          <label className="w-full font-bold">Seed (optional)</label>
          <input
            {...register("seed")}
            type="text"
            className="text-white p-3 bg-gray-800 rounded-md drop-shadow-md w-full"
          />
        </div>
        <div className="grid place-items-center w-full md:w-4/5 xl:w-full text-left">
          <button
            type="button"
            onClick={handleRandomize}
            disabled={mutation.isLoading}
            className="px-3 py-2 bg-teal-400 flex justify-center items-center gap-2 w-full rounded-md  hover:bg-teal-600 transition-all duration-300 disabled:bg-teal-600 disabled:hover:scale-100"
          >
            <Image src={"/dice.png"} alt="dice" width={32} height={32} />
            Randomize
          </button>
        </div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="px-3 py-2 bg-teal-400 rounded-md hover:scale-110 hover:bg-teal-600 transition-all duration-300 disabled:bg-teal-600 disabled:hover:scale-100"
        >
          {mutation.isLoading ? "Generating..." : "Generate"}
        </button>
        {mutation.isError && (
          <p>Error: An error occurred while generating the image.</p>
        )}
      </form>
    </div>
  );
};

export default PromptForm;
