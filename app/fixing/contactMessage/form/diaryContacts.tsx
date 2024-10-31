import { FieldArray } from "formik";
import HelpMessage from "../../../layout/helpMessage";
import DiaryContact from "../diaryContact";
import { Call, ContactMessage, EnsembleContact } from "@prisma/client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export type DiaryContactsProps = {
  sectionContacts: EnsembleContact[];
  eventCalls: Call[];
  currentContacts: ContactMessage[];
  appendedContacts: {
    contactId: string;
    contactMessageId: number | undefined;
    position: string;
    name: string;
    playerMessage: string | null;
    calls: number[];
  }[]
}

export default function DiaryContacts(props: DiaryContactsProps) {
  const {sectionContacts, eventCalls, currentContacts, appendedContacts } = props;
  const [sortContacts, setSortContacts] = useState<"alphabetical"|"category"|"role">("alphabetical");

  return (
    <div>
      <FieldArray name='contacts'>
                {({ push }) =>
                  sectionContacts.length === 0 ? (
                    <div className='my-4 flex w-full justify-center'>
                      <HelpMessage
                        head='No diary contacts.'
                        additional='Remove your filters, or add new contacts to you Address Book.'
                      />
                    </div>
                  ) : 
                  <table className='border  w-full'>
                          <thead className='border bg-slate-50 text-sm '>

                    <tr>
                      <th></th>
                      <th className='text-start p-1 py-2'>
                <button onClick={(e) => {e.preventDefault(); setSortContacts("alphabetical")}} className='flex flex-row items-center hover:text-gray-700'>Name
                  <div className="w-3 ">
                  {sortContacts.toLocaleLowerCase() === "alphabetical"
                && <FaCaretDown />}
                </div>
                </button>
                </th>
                <th className='text-start p-1 py-2'>
                <button onClick={(e) => {e.preventDefault(); setSortContacts("category")}} className='flex flex-row items-center hover:text-gray-700'>Category
                  <div className="w-3 ">
                  {sortContacts.toLocaleLowerCase() === "category"
                && <FaCaretDown />}</div>
                </button>
                </th>
                <th className='text-start p-1 py-2'>
                <button onClick={(e) => {e.preventDefault(); setSortContacts("role")}} className='flex flex-row items-center hover:text-gray-700'>Role
                  <div className="w-3 ">
                  {sortContacts.toLocaleLowerCase() === "role"
                && <FaCaretDown />}</div>
                </button>
                </th>
{/*                       <th></th>
 */}                    </tr>
                    </thead>
                    <tbody>
                  {(
                    sectionContacts
                    .sort((a,b) => (
                      sortContacts.toLocaleLowerCase() === "role"
                  ? a.role.localeCompare(b.role) 
                  : sortContacts.toLocaleLowerCase() === "category"
                  ? a.category!.localeCompare(b.category!) 
                  : a.lastName.localeCompare(b.lastName) 
                    )).map((i) => (
                        <DiaryContact
                          setSelectContact={() =>
                            push({
                              contactId: i.id,
                              position: i.role,
                              name: `${i.firstName} ${i.lastName}`,
                              playerMessage: undefined,
                              calls: eventCalls.map((j) => String(j.id)),
                            })
                          }
                          disabled={
                            appendedContacts
                              .map((j) => j.contactId)
                              .includes(i.id) ||
                            currentContacts
                              .map((j) => j.contactId)
                              .includes(i.id)
                          }
                          key={i.id}
                          contact={i}
                        />
                      ))
                  )}
                  </tbody>
                  </table>

                }
              </FieldArray>
    </div>
  )
}