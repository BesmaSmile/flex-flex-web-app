"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useStore } from "@/store";
import { Navbar } from '@/components';
import { useToastNotifications } from '@/hooks';

export default function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated);

  const getFavorites = useStore((state) => state.getFavorites);
  const hasHydrated = useStore((state) => state.hasHydrated);
  const getProfile = useStore((state) => state.getProfile);

  const success = useStore((state) => state.favorites.success);
  const error = useStore((state) => state.favorites.error);
  useToastNotifications({ success, error })

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
    getProfile();
  }, [hasHydrated, isAuthenticated, router, getProfile]);

  useEffect(() => {
    if (!isAuthenticated) return;
    getFavorites();
  }, [isAuthenticated, getFavorites]);

  if (!isAuthenticated) {
    return null
  }

  return <><Navbar />{children}</>
}