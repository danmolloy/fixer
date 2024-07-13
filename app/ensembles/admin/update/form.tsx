'use client'
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import TextInput from "../../../forms/textInput";
import { EnsembleAdmin } from "@prisma/client";

export type InviteAdminFormProps = {
  admin: EnsembleAdmin
}

export default function UpdateAdminForm(props: InviteAdminFormProps) {
  const { admin } = props;
  const router = useRouter();

  const formSchema = Yup.object().shape({
    adminId: Yup.string().required("admin id required"),
    positionTitle: Yup.string().required("position title required"),
    accessType: Yup.string().required("choose access type")
  });

  const initialVals = {
    adminId: admin.id,
    positionTitle: admin.positionTitle,
    accessType: admin.accessType,

  }

  const handleSubmit = async (data: {
    adminId: string
    positionTitle: string
    accessType: string
  }) => {
    return await axios.post("/ensembles/admin/api/update", data).then(() => {
    router.push(`/ensembles/${admin.ensembleId}`)
    });
  }

  return (
    <div data-testid="update-admin-form">
      <Formik 
        initialValues={initialVals} 
        validationSchema={formSchema} 
        onSubmit={(values, actions) => {
          handleSubmit(values)
          actions.setSubmitting(false);
        }}>
        {props => (
          <Form>
            <TextInput label="Position Title" id="position-title-input" name="positionTitle"  />
            <div id="access-radio-group">Access Type</div>
            <div role="group" aria-labelledby="access-radio-group">
              <label>
                <Field type="radio" name="accessType" value="restricted" />
                Restricted
              </label>
              <label>
                <Field type="radio" name="accessType" value="full" />
                Full
              </label>
            </div>
            <button type="submit">Submit</button>
            {JSON.stringify(props.errors)}
          </Form>
        )}
      </Formik>
    </div>
  )
}