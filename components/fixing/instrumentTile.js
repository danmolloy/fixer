import ActiveCalls from "./activeCalls";
import { useState } from "react";
import EditCalls from "./editCalls";
import axios from "axios";
import { Button, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import BookingTab from "./bookingTab";
import AvailabilityTab from "./availabilityTab";

export default function InstrumentTile(props) {
  const { eventCalls, instrumentName, keyId, eventId, instrumentalists, activeCalls, callsOutId, refreshProps } = props
   const [editList, setEditList] = useState(false)
   const [tabIndex, setTabIndex] = useState("0")

  let instrumentFixed = activeCalls && activeCalls.musicians.filter(i => i.accepted === true).length === activeCalls.numToBook

  let instrumentalistsList = activeCalls !== null ? instrumentalists.filter(i => !activeCalls.musicians.map(i => i.musicianEmail).includes(i.email)) : instrumentalists
  
  const handleSubmit = (vals) => {
    let obj = {
      eventId: eventId, 
      instrumentName: instrumentName,
      musicians: String(vals.callOrder).toLowerCase() === "random"
        ? [...vals.appendedPlayers].sort(() => Math.random() - 0.5).map(i => ({musicianEmail: i.email})) //callsOffered for this too!
        : [...vals.appendedPlayers].map(i => ({
          musicianEmail: i.email,
          callsOffered: [...eventCalls.map(i => (i.id))]
        })),
      callsOutId: callsOutId,
      callOrder: vals.callOrder,
      numToBook: vals.numToBook,
      bookingOrAvailability: 'Availability'
    }
    axios.post('/api/fixing/offer', obj).then(() => {
      setEditList(false)
      refreshProps();
    })
  .catch(function (error) {
    console.log(error);
  });
    /* axios.post('/api/event/fix', obj)
    .then(function (response) {
      axios.post('/api/fixing/sendCalls', response.data.call)
      .then(response => {
        console.log(response);
      }).then(() => {
        setEditList(false)
        refreshProps();
      })
    })
    .catch(function (error) {
      console.log(error);
    }); */
  }

  return (
    <div data-testid={`${instrumentName}-tile`} className={instrumentFixed /* && !editList */ ? "border-green-500 " : "w-full h-full"} key={keyId}>
      <div className="instrument-tile-header">
        <h2 className={instrumentFixed ? "text-green-500" : "p-1"}>{props.instrumentName}</h2>
        {/* <div>
          <Button data-testid={`${instrumentName}-edit-btn`} variant="outlined" className="edit-btn text-blue-500 border-blue-500 hover:bg-blue-100" onClick={() => setEditList(!editList)}>{editList ? "Close" : "Edit"}</Button>
        </div> */}
      </div>
      <TabContext value={tabIndex}>
      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Booking" value={"0"}/>
        <Tab label="Availability" value={"1"}/>
      </Tabs>
      
      <TabPanel value={"0"} >
      {/* {activeCalls.musicians.length > 0
        ? <ActiveCalls closeEdit={() => setEditList(false)} instrumentName={instrumentName} refreshProps={refreshProps} instrumentSection={activeCalls} editList={editList} instrumentFixed={instrumentFixed}/>
        : <p className="text-gray-500 -mt-2 pl-1">No calls out.</p>}
        {editList && <EditCalls handleSubmit={(values) => handleSubmit(values)} closeEdit={() => setEditList(false)} refreshProps={refreshProps} callsOutId={callsOutId} eventId={eventId} key={keyId} appendPlayer={i => appendPlayer(i)} instrumentName={instrumentName} instrumentalists={instrumentalistsList}/>}
 */}
      <BookingTab 
        instrumentalistsList={instrumentalistsList}
        appendPlayer={i => appendPlayer(i)}
        setEditList={i => setEditList(i)}
        eventId={eventId}
        eventCalls={eventCalls}
        keyId={keyId}
        editList={editList}
        activeCalls={activeCalls}
        refreshProps={refreshProps}
        instrumentFixed={instrumentFixed}
        handleSubmit={(values) => handleSubmit(values)}
        callsOutId={callsOutId}
        instrumentName={instrumentName}/>
      </TabPanel>
      <TabPanel value={"1"}>
        <AvailabilityTab 
        instrumentalistsList={instrumentalistsList}
        appendPlayer={i => appendPlayer(i)}
        setEditList={i => setEditList(i)}
        eventId={eventId}
        keyId={keyId}
        editList={editList}
        activeCalls={activeCalls}
        refreshProps={refreshProps}
        instrumentFixed={instrumentFixed}
        handleSubmit={(values) => handleSubmit(values)}
        callsOutId={callsOutId}
        instrumentName={instrumentName}
        />
      </TabPanel>
      </TabContext>


  </div>
  )
}