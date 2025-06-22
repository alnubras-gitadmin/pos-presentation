"use client"
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    router.push('/slides/01')
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Loader2 className="h-4 w-4 animate-spin" />
      Redirecting to the first slide...
    </div>
  );
}
