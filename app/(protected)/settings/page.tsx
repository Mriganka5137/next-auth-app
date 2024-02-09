"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
  const user = useCurrentUser();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default SettingsPage;
