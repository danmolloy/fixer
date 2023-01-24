import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment/moment";
import { TiMail, TiTick, TiTimes } from "react-icons/ti";
import {FiCoffee } from "react-icons/fi"


const createTable = (eventCalls, instrumentSection) => {
  let objArr = [{
    name: "Header",
    calls: eventCalls.map(i => ({
      id: i.id,
      startTime: i.startTime
    }))
  }]

  let sortedMusicians = instrumentSection.musicians.sort((a, b) => a.id - b.id)

  for (let i = 0; i < sortedMusicians.length; i ++) {
    objArr = [...objArr, {
      name: sortedMusicians[i].musician.name,
      calls: sortedMusicians[i].calls.map(i => (i.id)),
      recieved: sortedMusicians[i].recieved,
      accepted: sortedMusicians[i].accepted,
    }]
  }

  return objArr;
}


export default function BookingTable(props) {
  const {eventCalls, instrumentSection} = props;


  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell></TableCell>
            {createTable(eventCalls, instrumentSection).find(i => i.name === "Header").calls.map(i => (
              <TableCell key={i.id}>{moment(new Date(i.startTime)).format("H:mm a DD[/]MM")}</TableCell>
            ))}
          </TableHead>
          {createTable(eventCalls, instrumentSection).filter(i => i.name !== "Header").map(i => (
            <TableRow key={i.name}>
              <TableCell className={String(i.accepted).toLowerCase() === "false" && "text-slate-400"}>{i.name}</TableCell>
              {i.calls.map(j => (
                <TableCell key={j.id}>
                  {String(i.accepted).toLowerCase() === "true" 
                  ? <div className="text-green-600"><TiTick /></div>
                  : String(i.accepted).toLowerCase() === "false"
                  ? <div className="text-slate-400"><TiTimes /></div>
                  : String(i.recieved).toLowerCase() === "true" 
                  ? <div><TiMail /></div>
                  : <div className="text-slate-400"><FiCoffee /></div>
                  }</TableCell>
              ))}
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </div>
  )
}