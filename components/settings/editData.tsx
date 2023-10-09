import { useState } from "react";
import { DetailsDivProps } from "./detailsDiv";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { RequiredStringSchema } from "yup/lib/string"
import { RequiredNumberSchema } from "yup/lib/number";
import { AnyObject } from "yup/lib/types"


export type EditDataProps = {
  id: string;
  className: string;
  title: string;
  value: string;
  handleUpdate: (args: {data:{[x: string]: string}, userId: string}) => void;
  userId: string;
  inputType: string;
  schemaValue: RequiredStringSchema<string, AnyObject>|RequiredNumberSchema<number, AnyObject>
}

export default function EditData(props: EditDataProps) {
  const { schemaValue, inputType, value, handleUpdate, title, userId } = props;
  const initialValues = { [title]: value };

  const formSchema = Yup.object().shape({
    [title]: schemaValue
  })
    
    return (
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            handleUpdate({data: {...values}, userId: userId})
            actions.setSubmitting(false);
          }}
        >
          {props => (
            <Form>
            <Field id={title} name={title} placeholder={value !== null && `${value}`} className="border rounded p-1 m-1 w-1/2"/>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-white py-1 px-2 m-1 rounded shadow">
              Update
            </button>
            <ErrorMessage name={title}>
          { msg => <div className="p-1 text-red-600 text-sm" data-testid={`${title}-error`}>{msg}</div> }
        </ErrorMessage>
          </Form>
          )}
      
        </Formik>
      </div>
    );
}