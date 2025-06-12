"use client";
import { Button } from "@/componets/atoms/button";
import WorkSpacesTemplate from "@/componets/templates/WorkSpacesTemplate";
import { useLogout } from "@/lib/hooks/useAuth";
import { useToastMessage } from "@/lib/hooks/useToastMessage";

const page = () => {
  const { mutate: logout } = useLogout();
  const toast = useToastMessage();

  function handleLogout() {
    logout();
  }

  return (
    <main>
      <Button
        className="bg-blue-700"
        onClick={() =>
          toast.showSuccess({
            title: "Demo toast",
            description: "demo",
            duration: 6000,
          })
        }
      >
        Toast
      </Button>
      <WorkSpacesTemplate handleLogout={handleLogout} />
    </main>
  );
};

export default page;
