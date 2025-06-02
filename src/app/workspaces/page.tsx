"use client";
import WorkSpacesTemplate from "@/componets/templates/WorkSpacesTemplate";
// import { useToastMessage } from "@/lib/hooks/useToastMessage";
import React from "react";

const page = () => {
  // const toast = useToastMessage();

  // function handleClick() {
  //   console.log("woriking")
  //   toast.showSuccess({
  //     title: "Task Completed Successfully!",
  //     description:
  //       "Frontend implementation has been marked as complete and moved to testing phase.",
  //     duration: 6000,
  //     actions: [
  //       {
  //         label: "View Details",
  //         onClick: () =>
  //           toast.showInfo({
  //             title: "Loading task details...",
  //             description: "Redirecting to task dashboard.",
  //           }),
  //       },
  //     ],
  //   });
  // }
  return (
    <main>
      <WorkSpacesTemplate />
    </main>
  );
};

export default page;
