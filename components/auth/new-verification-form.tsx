"use client";

import { PropagateLoader } from "react-spinners";
import CardWrapper from "./card-wrapper";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    console.log("submitting token", token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      {/* <PropagateLoader /> */}
    </CardWrapper>
  );
};

export default NewVerificationForm;
