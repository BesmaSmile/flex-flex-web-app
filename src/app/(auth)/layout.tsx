"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useStore } from "@/store";
import { useEventListener } from '@/hooks';

export default function AuthRedirect({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated);
  const hasHydrated = useStore((state) => state.hasHydrated);

  useEventListener();

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