'use client'
import { Call, ContactMessage, EnsembleContact, Event, EventSection } from "@prisma/client";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { DateTime } from "luxon";

export type UpdateEventSectionProps = {
  eventSection: EventSection & {
    event: Event & {
      calls: Call[]
    }
    contacts: (ContactMessage &
      {
        contact: EnsembleContact,
      })[]
  }
}

export default function UpdateEventSection(props: UpdateEventSectionProps) {
  const { eventSection } = props;



  return (
    <div className="outline">
      <Formik 
        //validationSchema={}
        onSubmit={() => alert("Submit")}
        initialValues={{
          contacts: eventSection.contacts
        }}>
          {props => (
            <Form>
              <FieldArray 
                name="contacts"
                render={({push, remove}) => (
                  <table>
                    <thead>
                      <tr className="text-sm">
                        <td>Queue Number</td>
                        <td>Name</td>
                        <td>Call Type</td>
                        {eventSection.event.calls.map(i => (
                          <td key={i.id}>
                            <p>
                              {DateTime.fromJSDate(i.startTime).toFormat("hh:mm a")}
                            </p>
                            <p>
                            {DateTime.fromJSDate(i.startTime).toFormat("dd LLL")}

                            </p>
                          </td>
                        ))}
                        <td>
                          Role
                        </td>
                        <td>
                          Status
                        </td>
                        <td>
                          Message
                        </td>
                        <td>Up/Down/Remove</td>
                      </tr>
                    </thead>
                    <tbody>
                    {props.values.contacts.map((i, index) => (
                      <tr>
                        <td  className="border">
             <p>{i.contact.indexNumber}</p>
            </td>
            <td className="border">
              <p>{i.contact.firstName} {i.contact.lastName}</p>
            </td>
            <td>
              <Field as="select" name={`contacts[${index}]bookingOrAvailability`}>
                <option value={"Booking"}>
                  To Book
                </option>
                <option value={"Availability"}>
                  Availability Check
                </option>
              </Field>
            </td>
            {eventSection.event.calls.map(j => (
              <td key={j.id}>
                
              </td>
            ))}
            <td>
              <Field name={`contacts[${index}]position`} />
            </td>
            <td>
              <Field as="select" name={`contacts[${index}]accepted`}>
                <option value={`true`}>Accepted</option>
                <option value={"fal"}>Declined</option>
                <option value="">Awaiting Response</option>
                <option value="">Not contacted</option>

              </Field>
            </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                  )}
               /> 
            </Form>
          )}
        
      </Formik>
      
    </div>
  )
}