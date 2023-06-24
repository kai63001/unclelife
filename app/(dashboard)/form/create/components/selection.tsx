'use client';
import { useState } from "react";
import dynamic from "next/dynamic";
const CreateFormMainPage = dynamic(
    () => import("./main"),
    { ssr: false }
);

const CreateFormSelection = () => {
  return (
    <div>
      <CreateFormMainPage />
    </div>
  );
};

export default CreateFormSelection;
