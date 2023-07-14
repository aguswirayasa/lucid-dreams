"use client";
import React, { Suspense } from "react";
import PromptForm from "../../components/PromptForm";
import { Provider } from "react-redux";
import { store } from "../store";
import { useSelector } from "react-redux";
import ImageCard from "../../components/ImageCard";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import { RootState } from "../store/promptSlice";
import Main from "./Main";
import { Toaster } from "react-hot-toast";
const playground = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster />
        <Main />
      </Provider>
    </QueryClientProvider>
  );
};

export default playground;
