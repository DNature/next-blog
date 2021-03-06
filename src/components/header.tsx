import React from 'react';
import Link from 'next/link';
import {
  useUpdateEffect,
  useDisclosure,
  Stack,
  Button,
  clsx,
  nature,
  IconButton,
} from '@nature-ui/core';

import { Search } from './algolia-search';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Logo } from './Logo';
import { MobileNaveContent, MobileNavButton } from './mobile-nav';
import { useRouter } from 'next/router';
import { useColorMode, useColorModeValue } from './color-mode/color-mode';
import { Hack } from './hack';

const NavLink = ({ children, href, ...props }) => {
  const { pathname } = useRouter();
  return (
    <Button variant='none' {...props}>
      <Link href={href}>
        <a
          className={clsx('font-medium hidden sm:block', {
            [`text-gradient`]: pathname.includes(href),
          })}
        >
          {children}
        </a>
      </Link>
    </Button>
  );
};

const Header = () => {
  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

  const mobileNav = useDisclosure();

  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);
  return (
    <nature.header
      css={{
        backdropFilter: 'blur(10px)',
      }}
      className='sticky top-0 left-0 w-full z-50 bg-glass'
    >
      <nav className='w-full max-w-screen-lg px-4 md:px-0 md:mx-auto py-3'>
        <div className='flex items-center justify-between xl:px-0'>
          <Stack row spacing='6'>
            <Logo />
            <NavLink href='/blog'>Blog</NavLink>
            <NavLink href='/about'>About</NavLink>
            <NavLink href='/works'>Works</NavLink>
            <NavLink href='/contact'>Contact</NavLink>
          </Stack>
          <div className='md:w-2/5 flex items-center justify-end'>
            <Search className='hidden md:block' />
            <IconButton
              size='md'
              className='text-lg sm:ml-3'
              text='current'
              aria-label={`Switch to ${text} mode`}
              variant='ghost'
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <MobileNavButton
              ref={mobileNavBtnRef}
              aria-label='Open Menu'
              onClick={mobileNav.onOpen}
            />
          </div>
        </div>
      </nav>

      <MobileNaveContent
        isOpen={mobileNav.isOpen}
        onClose={mobileNav.onClose}
      />

      <Hack />
    </nature.header>
  );
};

export default Header;
