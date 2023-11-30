import { Ensemble, EnsembleAdmin } from "@prisma/client"
import { ErrorMessage, Field, FieldArray, Formik } from "formik"
import TextInput from "../../event/createUpdate/textInput"
import axios from "axios"
import * as Yup from 'yup';
import { sectionsArr } from "../../fixing/fixing";
import SelectMenu from "../../layout/components/selectMenu/selectMenu";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { AdminWithEnsemble } from "./accountInfo/ensembleAdmin";



export type EnsembleFormProps = {
  userEnsembles: AdminWithEnsemble[]
  userId: string
}

export default function EnsembleForm(props: EnsembleFormProps) {
  const { userEnsembles, userId } = props
  const router = useRouter()


  const CreateEnsembleSchema = Yup.object().shape({
    ensembleName: Yup.string().required("ensemble name required"),
    adminOrMusician: Yup.string().required("department required"),
    positionTitle: Yup.string().required("position title required"),
/*     section: Yup.string().when("adminOrMusician", {
      is: "musician",
      then: (schema) => schema.required("section required"),
    }), */
  })

  const handleSubmit = async (values) => {
    return await axios.post("/api/ensemble/create", {
      ensembleName: values.ensembleName,
      userPositionTitle: values.positionTitle,
      userId
    }).then(() => router.push("/account"))
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Formik 
      initialValues={{
        ensembleName: "",
        adminOrMusician: "admin",
/*         section: "",
 */        positionTitle: "",
      }} 
      validationSchema={CreateEnsembleSchema}

      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        handleSubmit(values).then(() => {
          actions.setSubmitting(false);
        })
      }}>
      {props => (
        <form data-testid="ensemble-form" className='sm:border sm:shadow-sm p-1 sm:p-2 sm:my-8 my-4 rounded flex flex-col items-center w-full md:w-3/4 ' onSubmit={props.handleSubmit}>
          <h1>Your Ensembles</h1>
          <div data-testid="current-ensembles">
            <h3>Current Ensembles</h3>
            <ul>
            {userEnsembles.length === 0 
            ? <p className="text-sm">No ensembles listed</p>
            : userEnsembles.map(i => (
            <li key={i.id}>
              <h3>{i.ensemble.name}</h3>
              <p>{i.positionTitle}</p>
            </li>
          ))}
          </ul>
          </div>
        <div data-testid="">
          <h3>Create Ensemble</h3>
        </div>
        <TextInput id="ensemble-name-input" label="Ensemble Name" name="ensembleName" />
        <div role="group" aria-labelledby="adminOrMusician" className="flex flex-col py-4 w-full">
        <div className="font-medium">Your Department</div>
          <label className="my-1">
            <Field type="radio" name="adminOrMusician" value="admin" />
            Administration
          </label>
          {/* <label className="my-1">
            <Field type="radio" name="adminOrMusician" value="musician" />
            Musician
          </label> */}
          <ErrorMessage name={`adminOrMusician`}>
            { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`ensemble-error`}>{msg}</div> }
          </ErrorMessage>
        </div>
        <TextInput id="position-input" label="Your Position" name="positionTitle"/>
{/*         <div>
        <SelectMenu id="section-select" tickSelected={false} values={sectionsArr.map(i => ({val: i, id: String(uuidv4())}))} handleSelect={(i) => props.setFieldValue("section", i)} selectedVal={props.values.section} />
        <ErrorMessage name={`section`}>
            { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`ensemble-error`}>{msg}</div> }
          </ErrorMessage>
        </div> */}
{/*         <TextInput id="section-input" label="Section" name="section" />
 */}        <button disabled={props.isSubmitting} type='submit' className='self-end bg-indigo-600 text-white disabled:bg-indigo-300 w-16 rounded py-1 hover:bg-indigo-500'>
          Submit
        </button>
      </form>
      )}
    </Formik>

  )
}