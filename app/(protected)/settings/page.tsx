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
    <div>
      {JSON.stringify(user)}
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default SettingsPage;
