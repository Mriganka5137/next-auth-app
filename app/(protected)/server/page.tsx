import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();
  return <div>{JSON.stringify(user)}</div>;
};

export default ServerPage;
