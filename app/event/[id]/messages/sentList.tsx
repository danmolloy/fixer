'use client';
import { SentEmail } from '@prisma/client';
import { DateTime } from 'luxon';
import { useState } from 'react';

export type SentEmailListProps = {
  emails: SentEmail[];
};

export default function SentEmailList(props: SentEmailListProps) {
  const { emails } = props;
  const [selectedEmail, setSelectedEmail] = useState<null | string>(null);

  return (
    <div className='m-4 text-sm'>
      {emails.map((i) => (
        <div className='rounded border transition-all' key={i.id}>
          <div
            onClick={() => {
              selectedEmail === i.id
                ? setSelectedEmail(null)
                : setSelectedEmail(i.id);
            }}
            className='flex flex-row justify-evenly p-2 hover:cursor-pointer hover:bg-slate-50'
          >
            <p>{i.email}</p>
            <p>{i.subject}</p>
            <p>{i.status}</p>
            <p>{DateTime.fromJSDate(i.timestamp).toFormat('f')}</p>
          </div>
          {selectedEmail === i.id && (
            <div className='p-2 text-sm'>
              <div dangerouslySetInnerHTML={{ __html: i.bodyText }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
