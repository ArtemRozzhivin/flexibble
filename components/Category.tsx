import { Listbox, Menu, Transition } from '@headlessui/react';
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

type CategoryProps = {
  value: string;
  onChange: (value: string) => void;
  list: string[];
  required?: boolean;
};

const Category = ({ value, onChange, list, required }: CategoryProps) => {
  return (
    <Listbox value={value} onChange={onChange} as='div' className='relative'>
      {({ open }) => (
        <>
          <Listbox.Button className='custom_menu-btn flex items-center gap-[6px]'>
            {value ? value : 'Category'}
            <ChevronDownIcon className={open ? 'h-5 w-5 transform rotate-180' : 'h-5 w-5'} />
          </Listbox.Button>
          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'>
            <Listbox.Options className='custom_menu-items'>
              {list.map((item) => (
                <Listbox.Option key={item} value={item} as='div' className='custom_menu-item'>
                  <span>{item}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};

export default Category;
