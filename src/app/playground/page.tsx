import React from "react";
import Main from "./Main";
import ReduxProvider from "@/providers/ReduxProvider";
const playground = () => {
  return (
    <ReduxProvider>
      <Main />
    </ReduxProvider>
  );
};

export default playground;
