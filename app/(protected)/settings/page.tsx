"use client";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { settings } from "@/lib/actions/settings.action";
import { useSession } from "next-auth/react";
const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(() => {
      settings({
        name: "Mriganka",
      }).then(() => {
        update();
      });
    });
  };
  return (
    <Card className=" w-[600px]">
      <CardHeader>
        <p className=" text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={handleClick}>
          Update name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
