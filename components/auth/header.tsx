import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className=" w-full flex-col items-center flex gap-y-4 justify-center">
      <h1 className={cn("text-4xl font-bold", font.className)}>Auth.js</h1>
      <p className=" text-muted-foreground">{label}</p>
    </div>
  );
};
