import axios from "axios"
import { ErrorMessage, Formik } from "formik"
import { useRouter } from "next/router"
import * as Yup from 'yup'
import TextInput from "../../../event/createUpdate/textInput"
import SelectMenu from "../../../layout/components/selectMenu/selectMenu"
import { instrumentArr } from "../../../fixing/fixing"
import EditPlayers from "./editPlayers"
import { User } from "@prisma/client"
import { CreateSectionArg } from "../../../../pages/api/section/create"

export type CreateSectionProps = {
  ensembleId: string
  directory: User[]
}


export default function CreateSection(props: CreateSectionProps) {
  const { directory, ensembleId } = props;
  const router = useRouter()


  const CreateSectionSchema = Yup.object().shape({
    ensembleId: Yup.string().required("ensemble name required"),
    instrument: Yup.string().required("instrument required"),
    sectionName: Yup.string().required("section name required"),
    members: Yup.array().of(Yup.object({
      userId: Yup.string().required(),
      positionTitle: Yup.string().required("player position title required"),
    })),
    extras: Yup.array().of(Yup.object({
      userId: Yup.string().required(),
      positionTitle: Yup.string().required("extra player position title required"),
    }))
  })

  const handleSubmit = async (values) => {

    const valuesObj: CreateSectionArg = {
      ensembleId: values.ensembleId,
      name: values.sectionName,
      members: values.members.map(i => ({
        userId: i.userId,
        positionTitle: i.positionTitle,
        positionNumber: i.positionNumber,
      })),
      extras: values.extras.map(i => ({
        userId: i.userId,
        positionTitle: i.positionTitle,
        positionNumber: i.positionNumber,
      })),
      instrument: values.instrument
    }
   
    return await axios.post("/api/section/create", valuesObj)
      .then(() => router.push(`/ensembles/${ensembleId}`))
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Formik 
      initialValues={{
        ensembleId: ensembleId,
        members: [],
        extras: [],
        sectionName: "",
        instrument: "",
        searchedMember: "",
        searchedExtra: ""
      }} 
      validationSchema={CreateSectionSchema}
      onSubmit={(values, actions) => {
        
        actions.setSubmitting(true);
        handleSubmit(values).then(() => {
        actions.setSubmitting(false);
      })
    }}>
      {props => (
        <form data-testid="create-section" className='sm:border sm:shadow-sm p-4 sm:p-2 sm:my-8 my-4 rounded flex flex-col items-center justify-center w-full md:w-1/2' onSubmit={props.handleSubmit}>
          <h3>Create Section</h3>
          <div className="self-start">
          <label htmlFor="instrument-select" className="font-medium">Instrument</label>

          <SelectMenu 
            selectedVal={props.values.instrument}
            id="instrument-select"
            tickSelected={false}
            handleSelect={(instrument) => {
              props.setFieldValue("instrument", instrument);
              instrument !== "Violin" ?
              props.setFieldValue("sectionName", instrument) 
              : props.setFieldValue("sectionName", "");
            }}
            values={
              instrumentArr.map(i => ({
                val: i, 
                id: i
              })
            )}/>
            <ErrorMessage name="instrument">
              {msg => <div className="p-1 text-red-600 text-sm" data-testid={`instrument-error`}>{msg}</div> }
            </ErrorMessage>
            </div>
          <TextInput name="sectionName" label="Section Name" id="section-name" />
          <EditPlayers
            members={props.values.members}
            directory={directory.filter(i => i.instrumentsList.includes(props.values.instrument))}
            selectDirPlayer={(playerObj) => {
              props.setFieldValue(playerObj.playerList, [...props.values[playerObj.playerList], {
              name: playerObj.name,
              userId: playerObj.id,
              positionTitle: playerObj.positionTitle,
              positionNumber: "-1"
            }]);
            props.setFieldValue(playerObj.searchCategory, "")
          }}
            extras={props.values.extras}
            searchedExtra={props.values.searchedExtra} 
            searchedMember={props.values.searchedMember}/>
          <button 
            disabled={props.isSubmitting} 
            type='submit' 
            className='self-end bg-indigo-600 text-white disabled:bg-indigo-300 w-16 rounded py-1 hover:bg-indigo-500'>
            Submit
          </button>
        </form>
      )}
    </Formik>
  )
}