import { Skeleton } from "@/components/atoms/skeleton";

export const SuspenseLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-6">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    </div>
  );
};
