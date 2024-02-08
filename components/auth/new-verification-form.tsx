"use client";

import { BeatLoader } from "react-spinners";
import CardWrapper from "./card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/lib/actions/new-verification.action";
import { FromError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token not found!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
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
      {!success && !error && <BeatLoader />}
      <FromError message={error} />
      <FormSuccess message={success} />
    </CardWrapper>
  );
};

export default NewVerificationForm;
