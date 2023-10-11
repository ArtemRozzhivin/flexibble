import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { footerLinks } from '@constants';

type FooterColumnProps = {
  title: string;
  links: string[];
};

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div className='footer_column'>
    {title && <h3 className='font-semibold'>{title}</h3>}

    <ul className='flex flex-col gap-2'>
      {links.map((link) => (
        <li key={link}>
          <Link href='/'>
            <p className='font-light'>{link}</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className='flexStart footer paddings'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex items-start flex-col'>
          <Link href='/'>
            <Image src='/logo.svg' width={115} height={43} alt='Flexibble' />
          </Link>

          <p className='text-start text-sm font-normal mt-5 max-w-xs'>
            Flexibble is the world's leading community for creatives to share, grow, and get hired.
          </p>
        </div>

        <div className='flex flex-wrap gap-12'>
          <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />

          <div className='flex flex-col flex-1 gap-5'>
            <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
            <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
          </div>

          <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />

          <div className='flex flex-col flex-1 gap-5'>
            <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
            <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
          </div>

          <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links} />
        </div>
      </div>

      <div className='footer_copyright flexBetween pt-5 border-t-2 border-t-light-white-500'>
        <p className='text-sm font-light'>@ 2023 Flexibble. All rights reserved.</p>

        <p className='text-sm font-light'>
          <span className='font-semibold'>8,912</span> projects submited
        </p>
      </div>
    </footer>
  );
};

export default Footer;
