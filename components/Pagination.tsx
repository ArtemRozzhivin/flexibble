'use client';

import React from 'react';
import Button from './Button';

const Pagination = () => {
  const hadnlePaginate = (direction: string) => {};

  return (
    <div className='flexCenter gap-5 mt-10'>
      <Button onClick={() => hadnlePaginate('first')} type='button' pirmary>
        Next
      </Button>
      <Button onClick={() => hadnlePaginate('previous')} type='button' pirmary>
        Previous
      </Button>
    </div>
  );
};

export default Pagination;
