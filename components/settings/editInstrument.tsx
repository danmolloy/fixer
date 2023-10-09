import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from 'yup';
import { RequiredStringSchema } from "yup/lib/string"
import { RequiredNumberSchema } from "yup/lib/number";
import { AnyObject } from "yup/lib/types"


export type EditInstrumentProps = {
  options: string[]
  id: string;
  className: string;
  title: string;
  value: string;
  handleUpdate: (args: {data:{[x: string]: string}, userId: string}) => void;
  userId: string;
  inputType: string;
  schemaValue: RequiredStringSchema<string, AnyObject>|RequiredNumberSchema<number, AnyObject>
}

export default function EditInstrument(props: EditInstrumentProps) {
  const { options, id, className, schemaValue, inputType, value, handleUpdate, title, userId } = props;
  //let regEx = new RegExp(propsValue, "gi");
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
            <div className="flex flex-col">
            <Field id={title} name={title} placeholder={value !== null && `${value}`} className="border rounded p-1 m-1 w-1/2"/>
            {props.values[title].length > 1 
              && !options.find(i => i === props.values[title])
              &&
            <div data-testid="combo-options-div" className="mt-10 w-60 bg-white absolute p-1 border rounded shadow">
              {options.filter(i => i.match(new RegExp(props.values[title], "gi"))).map(i => (
                <button className=" w-full text-start p-1 hover:bg-indigo-600 hover:text-white" key={i} onClick={() => props.setFieldValue(title, i)}>
                  {i}
                </button>
              ))}
            </div>}
            </div>
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


        {/* props.propsValue?.length > 1 
          && !options.find(i => i.textPrimary === propsValue)
          &&
        <div data-testid="combo-options-div" className="mt-16 w-[88vw] md:w-[66vw] lg:w-[45vw] bg-white absolute p-1 border rounded shadow">
          {options.filter(i => i.textPrimary.match(regEx)).map(i => (
            <button className=" w-full text-start p-1 hover:bg-indigo-600 hover:text-white" key={i.id} onClick={() => handleSelect(i.textPrimary)}>
              {i.textPrimary}
            </button>
          ))}
        </div> */}