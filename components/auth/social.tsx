"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

export const Social = () => {
  return (
    <div className=" w-full flex gap-x-2 items-center">
      <Button
        size="lg"
        variant="outline"
        onClick={() => {}}
        className=" w-full"
      >
        <FcGoogle className=" w-6 h-6" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => {}}
        className=" w-full"
      >
        <FaGithub className=" w-6 h-6" />
      </Button>
    </div>
  );
};
