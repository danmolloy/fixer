'use client'
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import * as Yup from 'yup';
import TextInput from "../../forms/textInput";
import axios from "axios";
import { useRouter } from "next/navigation";



export default async function CreateEnsembleForm(props: {userId: string}) {
  const router = useRouter()
  const { userId } = props;

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Ensemble name required"),
    ensembleNames: Yup.array().of(Yup.string()).required("Ensemble name(s) required").min(1, "You must provide at least one ensemble name."),
    userId: Yup.string().required("User ID required"),
  })

  const initialVals = {
    name: "",
    ensembleNames: [""],
    userId: userId
  }

  const handleSubmit = async (data: {name: string}) => {
    return await axios.post("create/api", data).then(() => {
    router.push("/billing")
    })
  }

  return (
   <div className="p-4">
      <Formik 
        initialValues={initialVals} 
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values)
          actions.setSubmitting(false);
        }}>
        {props => (
          <Form>
            <TextInput name={'name'} id="name-input" label="Organisation Name" />
            <div>
              <label htmlFor="ensembleNames">Ensemble Names</label>
            <FieldArray 
              name="ensembleNames" 
              render={arrayHelpers => (
                <div className="">
                  {props.values.ensembleNames.map((j, index) => (
                    <div key={index}>
                    <TextInput name={`ensembleNames[${index}]`} id={`ensembleNames[${index}]`} label="" />
                    <button onClick={(e) => {e.preventDefault(); props.values.ensembleNames.length > 1 && arrayHelpers.remove(index)}}>Remove</button>
                    </div>
                  ))}
                  <button onClick={(e) => {e.preventDefault(); arrayHelpers.push("")}}>Add</button>
                </div>
              )} 
              />
              <ErrorMessage name="ensembleNames">
                {e => <p className="text-sm text-red-500">{e}</p>}
              </ErrorMessage>
              </div>
            <button type="submit" className="w-24 self-end bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-2 py-1 rounded shadow">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}