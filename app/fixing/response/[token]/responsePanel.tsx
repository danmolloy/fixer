'use client'
import { Call, ContactMessage, EnsembleContact, EnsembleSection, Event, EventSection, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createEmailData } from "../../contactMessage/api/create/functions";
const url = `${process.env.URL}`


export type ResponsePanelProps = {
  contactMessage: ContactMessage & {
    contact: EnsembleContact
    eventSection: EventSection & {
      ensembleSection: EnsembleSection
      event: Event & {fixer: User}
    }
    calls: Call[]
  };
  accepted: boolean|null;
  bookingOrAvailability: string;
  fixerName: string;
}

export default function ResponsePanel(props: ResponsePanelProps) {
  const { contactMessage, accepted, bookingOrAvailability, fixerName } = props;
  const router = useRouter();

  const handleResponse = async (response: boolean) => {
    let confMsg: boolean;
    if (response === true && (bookingOrAvailability.toLocaleLowerCase() === "booking")) {
      confMsg = confirm("Are you sure you want to ACCEPT this offer?");
    } else if (response !== true && (bookingOrAvailability.toLocaleLowerCase() === "booking")) {
      confMsg = confirm("Are you sure you want to DECLINE this offer?");
    } else if (response === true && (bookingOrAvailability.toLocaleLowerCase() !== "booking")) {
      confMsg = confirm(`
        Please confirm you are available for this work. 
        If the fixer requires you, you will get a further offer which you will need to confirm.
        `);
    } else {
      confMsg = confirm("Are you sure you are NOT available for this work?");
    }
    if (confMsg) {
      try {
        await axios.post(`/fixing/contactMessage/api/update`, {
          id: contactMessage.id,
          data: {
            accepted: response,
            acceptedDate: new Date()
          }
        }).then(async () => {
          await axios.post(`/sendGrid`, {body: {
            emailData: createEmailData(contactMessage),
            templateID: "d-49ff83e234f54edead44ec38921181c0",
            emailAddress: contactMessage.contact.email
          }})
        }).then(() => {
          router.refresh();
        });

      } catch(e) {
        alert(`Error: ${e}`)
      }
    }
  }
  return (
    <div className="my-8  w-[90vw] flex flex-col justify-center items-center">
      {bookingOrAvailability.toLocaleLowerCase() === "booking" 
      && accepted === null 
      ? <div>
          <button onClick={() => handleResponse(false)} className="px-2 shadow text-white py-1 bg-red-500 hover:bg-red-600 m-4 rounded">Decline</button>
          <button onClick={() => handleResponse(true)} className="px-2 shadow text-white py-1 bg-blue-500 hover:bg-blue-600 m-4 rounded">Accept</button>
        </div> 
      : bookingOrAvailability.toLocaleLowerCase() === "booking" 
      && accepted !== null 
      ? <div>
          <h2>You have {accepted === true ? "accepted" : "declined"} this offer.</h2>
          <p className="text-sm">If this was an error, contact {fixerName} directly.</p>
        </div> 
        : <div>
          {accepted !== null 
          && <div>
              <h2>You have indicated that you are {accepted !== true && "not "}available for this work.</h2>
              <p>You can revise your response below.</p>
            </div>
            }
            <p className="text-center m-1 text-sm font-semibold">This work is {contactMessage.strictlyTied ? "strictly tied" : "not strictly tied"}.</p>
            <button className="p-2 m-1 hover:bg-amber-50 rounded border border-amber-600 text-amber-600 text-sm">No, I am not available</button>
            <button className="p-2 m-1 hover:bg-blue-50 rounded border border-blue-600 text-blue-600 text-sm">Yes, I am available</button>
          </div> }
          </div>
  )
}