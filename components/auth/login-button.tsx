"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  if (mode === "modal") {
    return <span>IMPLEMENT MODAL</span>;
  }
  const onClick = () => {
    router.push("/auth/login");
  };

  return (
    <span onClick={onClick} className=" cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
