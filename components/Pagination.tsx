'use client';

import React from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface IPagination {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const Pagination = ({ endCursor, startCursor, hasNextPage, hasPreviousPage }: IPagination) => {
  const currentParams = new URLSearchParams(window.location.search);
  const router = useRouter();

  const hadnlePaginate = (direction: string) => {
    if (direction === 'next' && hasNextPage) {
      currentParams.delete('startсursor');
      currentParams.set('endcursor', endCursor);
    } else if (direction === 'previous' && hasPreviousPage) {
      currentParams.delete('endcursor');
      currentParams.set('startcursor', startCursor);
    }

    const newPathName = `${window.location.pathname}?${currentParams.toString()}`;
    router.push(newPathName);
  };

  return (
    <div className='flexCenter gap-5 mt-10'>
      {hasPreviousPage && (
        <Button onClick={() => hadnlePaginate('previous')} type='button' pirmary>
          Previous
        </Button>
      )}
      {hasNextPage && (
        <Button onClick={() => hadnlePaginate('next')} type='button' pirmary>
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
