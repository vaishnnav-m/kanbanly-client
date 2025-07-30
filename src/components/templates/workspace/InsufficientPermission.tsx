import React from "react";

interface InsufficientPermissionProps {
  title: string;
  subHeading: string;
  subject: string;
}

function InsufficientPermission({
  title,
  subHeading,
  subject
}: InsufficientPermissionProps) {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex justify-center items-start pt-12">
      <div className="container w-11/12 max-w-4xl bg-card-bg rounded-lg p-8 shadow-lg">
        <div className="flex justify-between items-center mb-8 pb-5 border-b border-header-border">
          <div>
            <h1 className="text-3xl font-semibold text-white">{title}</h1>
            <p className="text-gray-400 text-sm mt-1">{subHeading}</p>
          </div>
        </div>

        <div className="bg-inner-card-bg rounded-lg p-8 flex flex-col items-center text-center min-h-[250px] justify-center">
          <div className="w-20 h-20 bg-icon-circle-bg rounded-full flex justify-center items-center mb-5">
            {/* Lock icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
          </div>
          <div className="access-denied-message">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">
              Permission Denied
            </h2>
            <p className="text-lg leading-relaxed text-gray-400 max-w-2xl mb-6">
              You do not have the necessary permissions to view the {subject} of
              this workspace. Please contact your workspace administrator for
              assistance or to request access.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-button text-white font-bold rounded-md hover:bg-blue-button-hover transition-colors"
            >
              Contact Administrator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsufficientPermission;
