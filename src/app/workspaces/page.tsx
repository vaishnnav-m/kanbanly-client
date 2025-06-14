"use client";
import WorkSpacesTemplate from "@/componets/templates/WorkSpacesTemplate";
import { useLogout } from "@/lib/hooks/useAuth";

const page = () => {
  const { mutate: logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <main>
      <WorkSpacesTemplate handleLogout={handleLogout} />
    </main>
  );
};

export default page;
