import { NavLinks } from '@constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthProviders from './AuthProviders';
import { getCurrentSession } from '@lib/nextAuthOptions';
import ProfileMenu from './ProfileMenu';

// because we are using next, so we make this function async
const Nav = async () => {
  const session = await getCurrentSession();

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href='/'>
          <Image src='/logo.svg' width={115} height={43} alt='Flexibble' />
        </Link>

        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map((link) => (
            <li key={link.key}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {session ? (
          <div className='flexCenter gap-5'>
            <Link href='/create-project'>ShareWork</Link>
            {session?.user?.image && <ProfileMenu session={session} />}
          </div>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Nav;
