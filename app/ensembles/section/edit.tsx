'use client'
import { EnsembleContact, EnsembleSection } from "@prisma/client"
import { Field, FieldArray, Formik } from "formik";
import axios from "axios";
import ButtonPrimary from "../../forms/buttonPrimary";
import { useRouter } from "next/navigation";
import { UpdateSectionProps } from "./api/edit/route";
import { instrumentSections } from "../../contacts/lib";

export type UpdateSectionFormProps = {
  section: EnsembleSection & {contacts: EnsembleContact[]}
}

export default function UpdateSectionForm(props: UpdateSectionFormProps) {
  const { section } = props;
  const router = useRouter()


  const initialVals: UpdateSectionProps = {
    id: section.id,
    name: section.name,
    contacts: section.contacts
  }

  const handleSubmit = async (vals: UpdateSectionProps) => {
    return await axios.post(`/ensembles/section/api/edit`, vals).then(() => {
      router.replace(`/ensembles/${section.ensembleId}`)
      
    })
  }

  

  return (
    <div data-testid="update-section-form">
      <Formik 
        initialValues={initialVals} 
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          handleSubmit(values);
          actions.setSubmitting(false);
        }}>
          {props => (
            <form id="fixing-form" className='flex flex-col w-full lg:w-2/3 py-8' onSubmit={props.handleSubmit}>
              <h1>Edit Section</h1>
              <label htmlFor="section-name">Section Name</label>
              <Field id="section-name" as="select" name="name">
                <option value={""}>Select section name</option>
                {instrumentSections.map(i => (
                  <option key={i.id} value={i.name}>{i.name}</option>
                ))}
              </Field>

              <FieldArray name="contacts" render={arrayHelpers => (
                <div data-testid="contacts-array">
                  {props.values.contacts.sort((a, b) => (
      a.lastName.localeCompare(b.lastName)
    )).sort((a,b) => a.indexNumber - b.indexNumber).sort((a, b) => (
        a.role.localeCompare(b.role))).sort((a, b) => (
          a.category!.localeCompare(b.category!)
        )).map((i, index) => (
                    <div data-testid={`${i.id}-contact`} key={i.id} className="flex flex-row">
                      <p data-testid={`${i.id}-indexNum`}>{i.indexNumber}</p>
                      <p>{i.role}</p>
                      <p>{i.category}</p>
                      <p data-testid="contact-name">{i.firstName} {i.lastName}</p>
                      <button data-testid={`${i.id}-up`} onClick={(e) => {e.preventDefault(); props.setFieldValue(`contacts.${index}.indexNumber`, i.indexNumber - 1)}}>Up</button>
                      <button data-testid={`${i.id}-down`} onClick={(e) => {e.preventDefault(); props.setFieldValue(`contacts.${index}.indexNumber`, i.indexNumber + 1)}}>Down</button>
                    </div>
                  ))}
                </div>
              )} />
              <ButtonPrimary
                handleClick={() => {}}
                isSubmitting={props.isSubmitting.toString() === "true" ? true: false}
                id="edit-section-btn" 
                type="submit" 
                className='disabled:bg-blue-100 bg-blue-600 hover:bg-blue-500 text-white w-24 self-end' 
                text="Submit"/>
            </form>
          )}
      </Formik>
      </div>
  )
}