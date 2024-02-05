import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});
export default function Home() {
  return (
    <main
      className={cn(
        "flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900 to-slate-950"
      )}
    >
      <div className=" space-y-6 text-center">
        <h1
          className={cn(
            " text-7xl text-sky-50 font-semibold",
            poppins.className
          )}
        >
          Auth.js
        </h1>
        <p className=" text-slate-400 text-lg">
          A simple authentication service
        </p>
        <div>
          <Button variant="secondary" size="lg" className=" text-lg">
            Sign in
          </Button>
        </div>
      </div>
    </main>
  );
}
