"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useStore } from "@/store";

export default function AuthRedirect({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const state = useStore((state) => state);
  console.log(state)
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated);
  const hasHydrated = useStore((state) => state.hasHydrated);
  useEffect(() => {
    if (!hasHydrated) return;
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, hasHydrated, router]);

  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
}