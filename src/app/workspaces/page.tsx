"use client";
import WorkSpacesTemplate from "@/componets/templates/WorkSpacesTemplate";
import { useLogout } from "@/lib/hooks/useAuth";

const page = () => {
  const { mutate: logout } = useLogout();

  function handleLogout() {
    logout();
  }

  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <main>
      <WorkSpacesTemplate handleLogout={handleLogout} />
    </main>
  );
};

export default page;
