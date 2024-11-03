import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from 'yup';
import { TiTimes } from "react-icons/ti";
import { instrumentSections } from "../../../../contacts/lib";
import axios from "axios";
import Router from "next/router";


export type ContactInputProps = {
  contacts: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    sectionName: string;
    role: string;
    category: string;
  }[]
  ensembleId: string;
}

export default function ContactInput(props: ContactInputProps) {
  const { contacts, ensembleId } = props;

  const contactInputSchema = Yup.object().shape({
    contacts: Yup.array().of(
      Yup.object({
        firstName: Yup.string().required("required"),
        lastName: Yup.string().required("required"),
        email: Yup.string().required("required"),
        phoneNumber: Yup.string().required("required"),
        sectionName: Yup.string().required("required"),
        role: Yup.string().required("required"),
        category: Yup.string().required("required")
      })
    ),
    ensembleId: Yup.string().required()
  })

  const handleSubmit = async (values) => {
    try {
      return await axios
      .post('/contacts/api/create/import', {
        values
      })
      .then(() => {
        Router.push(`/ensembles/${values.ensembleId}`);
      });
    } catch(e) {
      throw new Error(e);
    }
    
  };

  return (
    <Formik 
      initialValues={{
        contacts: contacts,
        ensembleId: ensembleId
      }} 
      validationSchema={contactInputSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.setSubmitting(false);
      }}>
      {props => (
        <Form>
            <FieldArray
                    name='contacts'
                    render={({push, remove}) => (
                      <div>
                              <div className="flex flex-col items-center rounded overflow-x-scroll">

          <table className="text-sm table-auto m-4 ">
        <thead>
          <tr>
            <th className="border">First Name</th>
            <th className="border">Last Name</th>
            <th className="border">Email</th>
            <th className="border">Phone Number</th>
            <th className="border">Role</th>
            <th className="border">Section</th>
{/*             <th>Section Id</th>
 */}            <th className="border">Category</th>
 <th className="border"></th>
          </tr>
        </thead>

                  <tbody>
                    {props.values.contacts.map((i, index) => (
          <tr className="border" key={index}>
            <td  className="border">
              <Field className="mx-0 border border-black rounded" name={`contacts.${index}.firstName`} />
              <ErrorMessage className="mx-0 border border-black rounded" name={`contacts.${index}.firstName`}>
                {e => <p className=" text-xs text-red-500">{e}</p>}
              </ErrorMessage>
            </td>
            <td className="border">
              <Field className="mx-0 border border-black rounded"  name={`contacts.${index}.lastName`} />
              <ErrorMessage name={`contacts.${index}.lastName`}>
                {e => <p className=" text-xs text-red-500">{e}</p>}
              </ErrorMessage>
            </td>
            <td className="border">
              <Field className="mx-0 border border-black rounded" name={`contacts.${index}.email`} />
              <ErrorMessage name={`contacts.${index}.email`}>
                {e => <p className=" text-xs text-red-500">{e}</p>}
              </ErrorMessage>
            </td>
            <td className="border">
              <Field className="mx-0 border border-black rounded" name={`contacts.${index}.phoneNumber`} />
              <ErrorMessage name={`contacts.${index}.phoneNumber`}>
                {e => <p className=" text-xs text-red-500">{e}</p>}
              </ErrorMessage>
            </td>
            <td className="border">
              <Field className="mx-0 border border-black rounded" name={`contacts.${index}.role`} />
              <ErrorMessage name={`contacts.${index}.role`}>
                {e => <p className=" text-xs text-red-500">{e}</p>}
              </ErrorMessage>
            </td>
            <td className="border flex flex-col items-start">              
            <Field className="mx-0 border border-black rounded" name={`contacts.${index}.sectionName`} as="select">
              <option value={""}>select</option>
              {instrumentSections.map(i => (
                <option value={i.name} key={i.id}>{i.name}</option>
              ))}
 </Field>

              <ErrorMessage className="border" name={`contacts.${index}.sectionName`}>
                {e => <p className=" text-xs text-red-500">{e}</p>}
              </ErrorMessage>
            </td>
            <td className="border">
              <Field className="mx-0 border border-black rounded" name={`contacts.${index}.category`} />
              <ErrorMessage name={`contacts.${index}.category`}>
                {e => <p className=" text-xs text-red-500">{e}</p>}
              </ErrorMessage>

            </td>
            <td className="border">
              <button className="disabled:opacity-40" disabled={props.values.contacts.length < 2} onClick={() => remove(index)}>
                      <TiTimes/>
              </button>
            </td>
          </tr>
         ))} 
                  </tbody>

        
      </table>
      </div>
        {props.errors.contacts && <p className="text-center text-xs">Missing fields are stated in red in the table.</p>}
      <div className="flex flex-row justify-between items-center">
                <button 
                  className="border border-black m-1 text-sm p-1 rounded hover:bg-slate-50"
                   onClick={() => push({
                    firstName:  "",
                    lastName:  "",
                    email: "",
                    phoneNumber:  "",
                    sectionName:  "",
                    role: "",
                    category: ""
                  })}>Add Row</button>
      <button
                          className="border border-blue-600 text-blue-600 m-1 text-sm p-1 rounded hover:bg-blue-50"

       type="submit">Submit</button></div>
                </div>
                )} />
        </Form>
      )}
    </Formik>
  )
}