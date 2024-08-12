'use client'
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import TextInput from "../../../../forms/textInput";
import { buttonPrimary } from "../../../dashboard";

export type InviteAdminFormProps = {
  ensembleId: string
}

export default function InviteAdminForm(props: InviteAdminFormProps) {
  const { ensembleId } = props;
  const router = useRouter();

  const formSchema = Yup.object().shape({
    ensembleId: Yup.string().required("Access code required"),
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string().email().required("email required"),
    positionTitle: Yup.string().required("position title required"),
    accessType: Yup.string().required("choose access type")
  });

  const initialVals = {
    ensembleId: ensembleId,
    firstName: "",
    lastName: "",
    email: "",
    positionTitle: "",
    accessType: "restricted"
  }

  const handleSubmit = async (data: {
    ensembleId: string
    firstName: string
    lastName: string
    email: string
    positionTitle: string
    accessType: string
  }) => {
    return await axios.post("/ensembles/admin/api/invite", data).then(() => {
    router.push(`/ensembles/${ensembleId}`)
    });
  }

  return (
    <div data-testid="invite-admin-form">
      <Formik 
        initialValues={initialVals} 
        validationSchema={formSchema} 
        onSubmit={(values, actions) => {
          handleSubmit(values)
          actions.setSubmitting(false);
        }}>
        {props => (
          <Form className="flex flex-col p-4">
            <h1>Invite Admin</h1>
            <TextInput label="First Name" id="first-name-input" name="firstName"  />
            <TextInput label="Last Name" id="last-name-input" name="lastName"  />
            <TextInput label="Email" id="email-input" name="email" type="email"  />
            <TextInput label="Position Title" id="position-title-input" name="positionTitle"  />
            <div id="access-radio-group">Access Type</div>
            <div role="group" aria-labelledby="access-radio-group">
              <label className="m-1">
                <Field className="m-1" type="radio" name="accessType" value="restricted" />
                Restricted
              </label>
              <label className="m-1">
                <Field className="m-1" type="radio" name="accessType" value="full" />
                Full
              </label>
            </div>
            <button className={"py-1 px-2 mx-4 my-4 rounded text-sm flex flex-row items-center hover:bg-gray-50 text-black border self-end"} type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}