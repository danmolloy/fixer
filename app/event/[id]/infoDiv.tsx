import React from 'react';

export type InfoDivProps = {
  id: string;
  className: string;
  title: string;
  value?: string | null;
};

export default function InfoDiv(props: InfoDivProps) {
  const { id, className, title, value } = props;
  return (
    <tr
      className={`${className} flex w-full flex-col p-4 md:flex-row md:items-center lg:justify-evenly`}
      data-testid={id}
    >
      <td className='text-sm text-slate-600 md:w-1/2'>{title}</td>
      <td className='md:w-1/2'>
        {!value || value.length < 1 ? 'Not specified' : value}
      </td>
    </tr>
  );
}
