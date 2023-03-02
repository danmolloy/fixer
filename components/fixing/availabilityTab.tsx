import ButtonPrimary from "../index/buttonPrimary"
import AvailabilityTable from "./availabilityTable"
import EditCalls from "./editCalls/editCalls"
import React from "react"

interface AvailabilityTabProps {
  editList: boolean
  setEditList: (arg: boolean) => void
  instrumentalistsList: {
    id: string
    name: string
    email: string
    emailVerified: boolean|null
    instrument: string
    profileInfo: null|string
    isFixer: null|boolean
  }[] 
  //appendPlayer: (player: any) => void 
  eventId: number 
  keyId: number 
  instrumentName: string 
  refreshProps: () => void
  handleSubmit: (val: any) => void 
  callsOutId: number
}

export default function AvailabilityTab(props: AvailabilityTabProps) {
  const { 
    editList,
    setEditList,
    instrumentalistsList, 
    //appendPlayer, 
    eventId, 
    keyId, 
    instrumentName, 
    refreshProps, 
    handleSubmit, 
    callsOutId } = props

  return (
    <div data-testid="availability-tab">
      
        <AvailabilityTable />
        <div className="w-full flex flex-row justify-end">
            <ButtonPrimary
              id={`booking-edit-btn`} 
              className=" m-4 px-4 text-blue-500 border-blue-500 hover:bg-blue-100" 
              handleClick={() => setEditList(!editList)}
              text={editList ? "Close" : "Edit"} />
          </div>
        {editList && <EditCalls handleSubmit={(values: any) => handleSubmit(values)} key={keyId} instrumentName={instrumentName} instrumentalists={instrumentalistsList}/>}
    
    </div>
  )
}