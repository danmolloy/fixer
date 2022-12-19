import { Button, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TiTick, TiTimes } from "react-icons/ti"



export default function AvailabilityTable(props) {
  const {} = props;

  const dummyDates = ["24/1", "25/1", "26/1", "27/1"]

const dummyRows = [
  {
  "name": "Eoghan Kelly", 
  "24/1": Math.floor(Math.random() * 10 ) > 3 ? true : false, 
  "25/1": Math.floor(Math.random() * 10 ) > 3 ? true : false, 
  "26/1": Math.floor(Math.random() * 10 ) > 3 ? true : false, 
  "27/1": Math.floor(Math.random() * 10 ) > 3 ? true : false
},
{
  "name": "Gerry Kelly", 
  "24/1": Math.floor(Math.random() * 10 ) > 3 ? true : false, 
  "25/1": Math.floor(Math.random() * 10 ) > 3 ? true : false, 
  "26/1": Math.floor(Math.random() * 10 ) > 3 ? true : false, 
  "27/1": Math.floor(Math.random() * 10 ) > 3 ? true : false
},
{
  "name": "Rory Dempsey", 
  "24/1": Math.floor(Math.random() * 10 ) > 3 ? true : false, 
  "25/1": Math.floor(Math.random() * 10 ) > 3 ? true : false, 
  "26/1": Math.floor(Math.random() * 10 ) > 3 ? true : false, 
  "27/1": Math.floor(Math.random() * 10 ) > 3 ? true : false
},
{
  "name": "Brett Sturdy", 
  "24/1": Math.floor(Math.random() * 10 ) > 5 ? true : false, 
  "25/1": Math.floor(Math.random() * 10 ) > 5 ? true : false, 
  "26/1": Math.floor(Math.random() * 10 ) > 5 ? true : false, 
  "27/1": Math.floor(Math.random() * 10 ) > 5 ? true : false
}
]

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Name</TableCell>
            {dummyDates.map(i => (
              <TableCell key={i}>{i}</TableCell>
            ))}
          </TableHead>
          {dummyRows.map(i => (
            <TableRow key={i.name}>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i["24/1"] === true ? <div className="text-green-500"><TiTick /></div>: <div className="opacity-50 text-slate-400"><TiTimes /></div>}</TableCell>
              <TableCell>{i["25/1"] === true ? <div className="text-green-500"><TiTick /></div>: <div className="opacity-50 text-slate-400"><TiTimes /></div>}</TableCell>
              <TableCell>{i["26/1"] === true ? <div className="text-green-500"><TiTick /></div>: <div className="opacity-50 text-slate-400"><TiTimes /></div>}</TableCell>
              <TableCell>{i["27/1"] === true ? <div className="text-green-500"><TiTick /></div>: <div className="opacity-50 text-slate-400"><TiTimes /></div>}</TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </div>
  )
}