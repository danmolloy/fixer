import { Field, FieldArray, Formik } from 'formik'
import Layout from '../../components/layout'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';




export default function Fix() {
  const router = useRouter()
  const { data: session } = useSession()


  if (!session) {
    return <p>Loading..</p>
  }


  return (
    <Layout>
      <h1>Fix an Event</h1>
      <Formik 
        initialValues={{
          fixer: session.user, 
          ensemble: undefined,
          ensembleName: undefined,
          concertProgram: undefined,
          calls:[{
            startTime: undefined,
            endTime: undefined,
            venue: undefined,
          }],
          dressCode: undefined,
          fee: undefined,
          additionalInfo: undefined,
        }}
        onSubmit={async(values, actions) => {
          if (values.ensemble === "Other") {
            values.ensemble = values.ensembleName
          }
          
          axios.post('/api/event', values)
          .then(response => {
            console.log(response.data.id);
            router.push(`/event/${response.data.id}`)
          })
          .catch(function (error) {
            console.log(error);
          }); 
          
             actions.setSubmitting(false);
        }}>
          {props => (
            <form className='fix-form' onSubmit={props.handleSubmit}>
              
              <label htmlFor='event-name'>Ensemble Name</label>
              <fieldset>
              <div className=''>
                <Field type="radio" id="bbcso-radio" name="ensemble" value={"BBC Symphony Orchestra"} />
                <label for="bbcso-radio">BBC Symphony Orchestra</label>
              </div>
              <div>
                <Field type="radio" id="lso-radio" name="ensemble" value={"London Symphony Orchestra"} />
                <label for="lso-radio">London Symphony Orchestra</label>
              </div>
              <div>
                <Field type="radio" id="other-radio" name="ensemble" value={"Other"} />
                <label for="other-radio">Other</label>
                <Field
                  className='input-box'
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.ensembleName}
                  name="ensembleName"
                  placeholder="Ensemble Name"
                /> 
              </div>
              </fieldset>
              
              <label htmlFor='concert-program'>Concert Program</label>
              <Field
                label="Concert Program"
                className='input-box'
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.concertProgram}
                name="concertProgram"
              />

              <FieldArray name="calls">
              {({ insert, remove, push }) => (
                <div>
                  {props.values.calls.map((call, index) => (
                    <div className='call-div'>
                      <p>{`Call ${index + 1}`}</p>
                      
                      <div>
                        <label htmlFor={`calls.${index}.startTime`}>Start Time</label>
                      <Field
                          label="Start Time"
                          className="datetime-input"
                          name={`calls.${index}.startTime`}
                          type="datetime-local"
                        />
                        </div>
                        <div>
                        <label htmlFor={`calls.${index}.endTime`}>End Time</label>
                        
                      <Field
                          label="End Time"
                          className="datetime-input"
                          name={`calls.${index}.endTime`}
                          type="datetime-local"
                        />
                        </div><div>
                        <label htmlFor={`calls.${index}.venue`}>Venue</label>
                      <Field 
                          label="Venue"
                          className="input-box"
                          name={`calls.${index}.venue`}
                          type="text"
                        />
                        </div>
                    </div>
                  ))}
                  <button
                  type="button"
                  className="add-call-btn"
                  color="primary" variant=""
                  onClick={() => push({
                    startTime: undefined,
                    endTime: undefined,
                    venue: undefined
                   })}
                >
                  Add Call
                </button>
                </div> 
              )}
              </FieldArray>
              <label htmlFor='dress-code'>Dress Code</label>
              <Field
                label="Dress Code"
                className='input-box'
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.dressCode}
                name="dressCode"
              />

              <label htmlFor='fee'>Fee</label>
              <Field
                label="Fee"
                className='input-box'
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.fee}
                name="fee"
              />
              <label htmlFor='additional-info'>Additional Information</label>
              <Field
                label="Additional Info"
                className='input-box-lg'
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.additionalInfo}
                name="additionalInfo"
              />
              <button type="submit" className='submit-btn' color="primary" variant="contained">Create</button>
            </form>
          )}
      </Formik>
    </Layout>
  )
}