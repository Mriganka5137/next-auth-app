"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import {} from "@/components/ui/sonner";
import { toast } from "sonner";
import { admin } from "@/lib/actions/admin.action";
const AdminPage = () => {
  const role = useCurrentRole();

  const handleAPIRouteClick = async () => {
    try {
      const response = await fetch("/api/admin");
      if (response.ok) {
        toast.success("You are allowed to see this content");
      } else {
        toast.error("You are not allowed to see this content");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleServerActionClick = async () => {
    const response = await admin();
    if (response.status === 200) {
      toast.success("You are allowed to see this content");
    }
    if (response.status === 403) {
      toast.error("You are not allowed to see this content");
    }
  };
  return (
    <Card className=" w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className=" space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className=" flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
          <p className=" text-sm font-medium">Admin-only API Route</p>
          <Button onClick={handleAPIRouteClick}>Click to test</Button>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
          <p className=" text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={handleServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
