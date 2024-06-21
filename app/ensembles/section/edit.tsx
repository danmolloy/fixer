import { EnsembleContact, EnsembleSection } from "@prisma/client"
import { UpdateSectionProps } from "../../../deprecatedPagesApi/api/section/edit";
import { Formik } from "formik";
import axios from "axios";
import ButtonPrimary from "../../forms/buttonPrimary";
import TextInput from "../../forms/textInput";
import { useRouter } from "next/navigation";

export type EditSectionProps = {
  section: EnsembleSection & {contacts: EnsembleContact[]}
  setEditSection: () => void
}

export default function EditSection(props: EditSectionProps) {
  const { section, setEditSection } = props;
  const router = useRouter()


  const initialVals: UpdateSectionProps = {
    id: section.id,
    name: section.name,
    instrument: section.instrument,
    //contacts: section.contacts
  }

  const handleSubmit = async (vals: UpdateSectionProps) => {
    return await axios.post(`${section.ensembleId}/section/api/edit`, vals).then(() => {
      router.refresh();
      setEditSection();
    })
  }

  return (
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
              <TextInput label="Section Name" id="section-name" name="name" />

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
  )
}