import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setData, setError } from "../app/store/promptSlice";
import { useMutation } from "react-query";

type FormData = {
  prompt: string;
  negativePrompt: string;
};

const PromptForm = ({ startLoading, finishLoading }: any) => {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch();

  const mutation = useMutation(
    (data: FormData) =>
      fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("An error occurred while making the API request");
        }
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
    <div className="grid gap-3">
      <form
        onSubmit={handleGenerate}
        className="flex justify-center items-center flex-col gap-3 w-full "
      >
        <div className="grid place-items-center w-full md:w-4/5 xl:w-full text-left">
          <label className="w-full font-bold">Prompt</label>
          <textarea
            {...register("prompt", { required: true })}
            className="text-white p-3 bg-gray-800 rounded-md drop-shadow-md w-full"
            style={{ height: "200px" }}
          />
        </div>
        <div className="grid place-items-center w-full md:w-4/5 xl:w-full text-left">
          <label className="w-full font-bold">Negative Prompt</label>
          <textarea
            {...register("negativePrompt", { required: true })}
            className="text-white p-3 bg-gray-800 rounded-md drop-shadow-md w-full"
            style={{ height: "200px" }}
          />
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
