import { Formik } from "formik";
import InstrumentsList from "./accountInfo/instrumentsList";
import PersonalInfo from "./personalInfo";
import { User } from "@prisma/client";
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";


export type BasicInfoProps = {
  user: User
}

export type BasicInfoValues = {
  firstName: string,
  lastName: string,
  instrumentsList: string[]
  email: string,
  mobileNumber: string
  preferredMethod: string
}

export default function BasicInfo(props: BasicInfoProps) {
  const { user } = props;
  const [submitStatus, setSubmitStatus] = useState<string>("")

  const initialVals: BasicInfoValues = {
    firstName: user.firstName ? user.firstName : undefined,
    lastName: user.lastName,
    instrumentsList: user.instrumentsList,
    email: user.email,
    mobileNumber: user.mobileNumber,
    preferredMethod: user.preferredMethod
  }

  const BasicUserSchema = Yup.object().shape({
    firstName: Yup.string().required("first name required"),
    lastName: Yup.string().required("last name required"),
    instrumentsList: Yup.array(Yup.string()),
    email: Yup.string().email().required("email required"),
    mobileNumber: Yup.string().required("contact number required"),
    preferredMethod: Yup.string().required("indicate your preferred contact method")
  })

  const handleSubmit = async (values: {data: BasicInfoValues, userId: string}) => {
    return await axios.post("/api/user/update", values).then(() => {
      setSubmitStatus("Successfully updated!")

    })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Formik 
      initialValues={initialVals}
      validationSchema={BasicUserSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        handleSubmit({data: values, userId: user.id}).then(() => {
          actions.setSubmitting(false);
        })
      }} >
      {props => (
        <form onSubmit={props.handleSubmit} data-testid="basic-info">
          <h1>About You</h1>
          <p>We just need a bit of info from you.</p>
          <PersonalInfo />
          <InstrumentsList instrumentsList={props.values.instrumentsList} />
          <button disabled={props.isSubmitting} type='submit' className='bg-indigo-600 text-white disabled:bg-indigo-300'>
            Submit
          </button>
        {submitStatus !== "" 
        && <p>{submitStatus}</p>}
        </form>
      )}
    </Formik>
  )
}