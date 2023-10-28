import { ErrorMessage, Field, Formik } from "formik";
import React from "react"
import TextInput from "../../event/createEvent/textInput";
import { instrumentArr } from "../../fixing/fixing";

export default function PersonalInfo() {

  return (
    <div className="sm:border sm:shadow-sm p-1 sm:p-2 mb-4 rounded flex flex-col items-center w-full md:w-3/4 ">
     <Formik
       initialValues={{ 
        firstName: "", 
        surname: "",      
        email: "",          
        image: "",        
        instrument: "",   
        profileInfo: "",  
        mobileNumber: "", 
        blockedPlayers: [],
        preferedContact: ""
        }}
       onSubmit={(values, actions) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}
     >
       {props => (
         <form onSubmit={props.handleSubmit}>
           <TextInput 
            name="firstName" 
            label="First Name"
            id="first-name-input"/>
            <TextInput 
            name="surName" 
            label="Surname"
            id="surname-input"/>
            <TextInput 
            type="email"
            name="email" 
            label="Email"
            id="email-input"/>
            <TextInput
            type="tel" 
            name="mobileNumber" 
            label="Mobile Number"
            id="mobile-input"/>
            <div className="flex flex-col py-4">
              <label htmlFor={"instrument"} className="text-slate-700">Instrument</label>
              <Field as="select" name="instrument" className="border shadow-sm p-1 rounded ">
                <option value={null}>Select instrument</option>
                {instrumentArr.map(i => (
                  <option value={i} key={i}>
                  {i}
              </option>
            ))}
              <option value={"other"}>Other</option>
            </Field>
            <ErrorMessage name={"instrument"}>
              { msg => <div className="p-1 text-red-600 text-sm" data-testid={`instrument-error`}>{msg}</div> }
            </ErrorMessage>
            {props.values.instrument === "other" 
            && <TextInput 
            asHtml='input' 
            label="Instrument Name" 
            name="newInstrument" 
            id="new-instrument" 
            className=''/>}
          </div>
           
         </form>
       )}
     </Formik>
   </div>
  )
}

// name         
//  email          
//  image        
//  instrument   
//  profileInfo  
//  firstName    
//  lastName     
//  mobileNumber 
//  Block players
// Contact preference i.e. WhatsApp
