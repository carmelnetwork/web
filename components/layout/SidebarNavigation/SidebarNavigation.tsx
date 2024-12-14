import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Readex_Pro } from 'next/font/google';
import { SidebarNavigationProps } from './props';
import { SidebarNavigationPlaceholder } from '~/components/placeholders/SidebarNavigation';
import { sidebarRoutes } from './routes';
import profile_placeholder from '~/images/profile_placeholder.webp';
import DynamicIcon from '~/components/icons/Dynamic';
import { AccessButton } from '~/components/access/AccessButton'
const readexPro = Readex_Pro({
  subsets: ['latin'],
});

export const SidebarNavigation = ({ data, isLoading, user }: SidebarNavigationProps) => {
  const router = useRouter();

  const [navbarElements, setNavbarElemens] = useState(sidebarRoutes);

  const handleLogin = () => {
    // user.auth.clearAccount();
    // window.location.reload();
    router.push('/access')
  };

  const handleNavClick = (targetHref: string) => {
    const updatedNavData = navbarElements.map((item: any) => ({
      ...item,
      current: item.href === targetHref,
    }));
    setNavbarElemens(updatedNavData);
  };

  useEffect(() => {
    const currentPath = router.asPath;
    const updatedNavData = navbarElements.map((item: any) => ({
      ...item,
      current: normalizePath(item.href) === normalizePath(currentPath),
    }));

    setNavbarElemens(updatedNavData);
  }, []);

  const normalizePath = (path: string) => path.replace(/\/+$/, '');

  if (isLoading) {
    return <SidebarNavigationPlaceholder />;
  }


  return (
    <div className="flex z-10 grow sticky top-0 relative flex-col gap-y-5 overflow-y-auto bg-gradient-to-br from-dark-green to-dark-green min-w-[300px] px-6 w-full mr-auto md:h-screen border-r border-cyan/10">
      <div className="flex h-16 shrink-0 items-center mt-4 border-b border-primary/20">
      <AccessButton/>
      </div>
      <nav className="flex flex-1 flex-col mt-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navbarElements.map((item, index) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`${
                      item.current
                        ? 'bg-dark-green-secondary text-cyan'
                        : 'text-gray-400 hover:text-white hover:bg-dark-green-secondary'
                    } ${
                      readexPro.className
                    } font-normal group flex gap-x-3 rounded-md p-2 text-sm leading-6 items-center cursor-pointer`}
                    onClick={() => handleNavClick(item.href)}>
                    {item.img ? (
                      <DynamicIcon name={item.img} width={24} height={24} />
                    ) : (
                      <Image
                        src={item.current ? item.iconActive : item.icon}
                        alt="card"
                        className={`object-fit w-8 h-8 -m-1`}
                      />
                    )}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto"></li>
        </ul>
      </nav>
     
    </div>
  );
};
