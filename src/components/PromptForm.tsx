"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setData, setError } from "../app/store/promptSlice";
import { useMutation } from "react-query";
import { randoms, ApiModels } from "../../data";
import Image from "next/image";

type FormData = {
  prompt: string;
  negativePrompt: string;
  seed: string;
  model: string;
};

const PromptForm = ({ startLoading, finishLoading }: any) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [prompt, setPrompt] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const dispatch = useDispatch();
  const handleRandomize = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const selectedModel = randoms[randomNumber - 1];
    setPrompt(selectedModel.prompt);
    setNegativePrompt(selectedModel.negative);
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
          <label className="w-full font-bold">Seed (optional)</label>
          <input
            {...register("seed")}
            type="text"
            className="text-white p-3 bg-gray-800 rounded-md drop-shadow-md w-full"
          />
        </div>
        <div className="grid place-items-center w-full md:w-4/5 xl:w-full text-left">
          <label className="w-full font-bold">Model</label>
          <select
            {...register("model", { required: true })}
            className="text-white p-3 bg-gray-800 rounded-md drop-shadow-md w-full font-sans"
          >
            {ApiModels.map((model, index) => {
              return (
                <option key={index} value={model.id}>
                  {model.name}
                </option>
              );
            })}
          </select>
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
