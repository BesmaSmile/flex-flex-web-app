import React, { useCallback } from 'react';
import Link from 'next/link';

import appName from '@/assets/img/app-name.svg';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store';
import Image from 'next/image';
import clsx from 'clsx';

function Navbar() {

  const user = useStore((state) => state.user.data);
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated);
  const logout = useStore((state) => state.logout);

  const onlogoutClick = () => {
    logout();
  };
  const pathname = usePathname();

  const mode = pathname === '/' ? 'dark' : 'light';

  const isCurrentPath = useCallback((path: string) => path === pathname, [pathname]);
  if (!isAuthenticated) return null;

  const paths = [
    { path: '/', name: 'Home' },
    { path: '/movies', name: 'Movies' },
    { path: '/tv-shows', name: 'TV Shows' },
    { path: '/favorites', name: 'My Favorites' },
    { path: '/search', name: 'Search' },
  ];



  return (
    <div className={clsx(
      "w-full h-[70px] px-5 z-[1] flex items-center justify-between",
      mode === 'dark'
        ? 'absolute text-white'
        : 'text-[#424040] bg-[#faf9f9] shadow-[0_2px_4px_-1px_#808080]'

    )}>
      <div className="w-full flex justify-start items-center gap-2">
        <Link href="/" className="mx-[10px] w-fit flex-none text-[14px]">
          <Image className="h-[70px] w-[200px] object-cover" src={appName} alt="app name" />
        </Link>

        {paths.map(({ path, name }) => (
          <Link
            key={name}
            href={path}
            className={clsx("font-semibold mx-[10px] w-fit flex-none text-[14px]",

              mode === 'light'
                ? 'hover:text-[#424040] hover:text-shadow-[1px_1px_2px_rgba(66,64,64,0.5)]'
                : 'hover:text-white hover:text-shadow-[1px_1px_2px_rgba(255,255,255,0.5)]',
              { 'text-white': isCurrentPath(path) && mode === 'dark' },
              { 'text-[#424040]': isCurrentPath(path) && mode === 'light' },
              { 'text-[#42404099]': !isCurrentPath(path) && mode === 'light' },
              { 'text-white/60': !isCurrentPath(path) && mode === 'dark' },
            )}
          >
            {name}
          </Link>
        ))}
      </div>

      <div className="flex justify-end items-center gap-2">
        <div className="mx-[10px] w-fit flex-none text-[14px]">
          <h5 className="mb-0">
            {user?.firstname} {user?.lastname}
          </h5>
        </div>

        <div className="mx-[10px] w-fit flex-none text-[14px]">
          <button
            type="button"
            className={`border px-3 py-1 rounded ${mode === 'dark'
              ? 'border-white text-white hover:bg-white hover:text-black'
              : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
              }`}
            onClick={onlogoutClick}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>

  );
}

export default Navbar;
