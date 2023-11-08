import * as Yup from 'yup';
import axios from "axios";
import { Formik } from 'formik';
import PersonalInfo from './personalInfo';
import AccountInfo, { UserWithBlockedPlayers } from './accountInfo';
import ProfileInfo from './profileInfo';
import { useState } from 'react';

export type SettingsIndexProps = {
  user: UserWithBlockedPlayers
}

export type UserSettingsValues = {
  firstName: string,
  lastName: string,
  instrumentsList?: string[]
  email: string,
  mobileNumber: string
  preferredMethod: string
  profileText?: string;
  image?: string;
  fixingEnsembles?: string[]
}


export default function SettingsIndex(props: SettingsIndexProps) {
  const { user } = props;
  const [submitStatus, setSubmitStatus] = useState<string>("")

  const initialVals: UserSettingsValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    instrumentsList: user.instrumentsList,
    email: user.email,
    mobileNumber: user.mobileNumber,
    preferredMethod: user.preferredMethod,
    profileText: user.profileText,
    image: user.image,
    fixingEnsembles: user.fixingEnsembles
  }

  const UserSettingsSchema = Yup.object().shape({
    firstName: Yup.string().required("first name required"),
    lastName: Yup.string().required("last name required"),
    instrumentsList: Yup.array(Yup.string()).notRequired(),
    email: Yup.string().email().required("email required"),
    mobileNumber: Yup.string().required("contact number required"),
    preferredMethod: Yup.string().required("please indicate your preferred contact method"),
    profileText: Yup.string().nullable(),
    image: Yup.string().nullable(),
    fixingEnsembles: Yup.array(Yup.string()).notRequired()
  })

  const handleSubmit = async (values: {data: UserSettingsValues, userId: string}) => {
    console.log("Hello from handleSubmit")
    return await axios.post("/api/user/update", values).then(() => {
      setSubmitStatus("Successfully updated!")
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
   <Formik initialValues={initialVals}
   validationSchema={UserSettingsSchema}
   onSubmit={(values, actions) => {

    actions.setSubmitting(true);
    handleSubmit({data: values, userId: user.id}).then(() => {
      actions.setSubmitting(false);
    })

   }} >
    {props => (
      <form data-testid="settings-index" onSubmit={props.handleSubmit}>
        <h1>Your Settings</h1>
        <PersonalInfo />
        <ProfileInfo />
        <AccountInfo ensemblesList={props.values.fixingEnsembles} instrumentsList={props.values.instrumentsList} user={user}/>

        <button disabled={props.isSubmitting} type='submit' className='bg-indigo-600 text-white disabled:bg-indigo-300'>
          Submit
        </button>
        {submitStatus !== "" 
        && <p>{submitStatus}</p>}
        {Object.keys(props.errors).length > 0 
                && props.submitCount > 0
                && <p className='text-sm text-center text-red-600'>
                    Please revise your form. Errors are stated in red.
                  </p>}
      </form>
    )}
   </Formik>
  )
}
