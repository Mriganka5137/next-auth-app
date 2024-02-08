import { Header } from "./header";
import { BackButton } from "./back-button";
import CardWrapper from "./card-wrapper";
import { FaExclamationTriangle } from "react-icons/fa";
const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops ! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className=" flex justify-center items-center">
        <FaExclamationTriangle className="text-xl text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
