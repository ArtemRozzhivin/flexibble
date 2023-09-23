import { Menu } from '@headlessui/react';
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

type DropdownProps = {
  name: string;
  list: string[];
};

const Dropdown = ({ name, list }: DropdownProps) => {
  return (
    <Menu as='div' className='relative'>
      {({ open }) => (
        <>
          <Menu.Button className='custom_menu-btn flex items-center gap-[6px]'>
            <span>Category</span>
            <ChevronDownIcon className={open ? 'h-5 w-5 transform rotate-180' : 'h-5 w-5'} />
          </Menu.Button>
          <Menu.Items className='custom_menu-items'>
            {list.map((item) => (
              <Menu.Item as='div' className='custom_menu-item' key={item}>
                <button>{item}</button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};

export default Dropdown;
