"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";

const AdminPage = () => {
  const role = useCurrentRole();
  return <div>Current role : {role}</div>;
};

export default AdminPage;
