"use client";

import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner
        label="We are fetching the contest details for you! All the best."
        color="primary"
        labelColor="primary"
      />
    </div>
  );
};

export default Loading;
