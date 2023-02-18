import moment from "moment"
import React from "react"
import EventTile from "./eventTile"

interface DateRangeViewProps {
  selectedDate: moment.Moment
  dateRange: number
  upcomingCalls: {
    id: number
    createdAt: string
    updatedAt: string
    startTime: string
    endTime: string
    venue: string
    eventId: number
    fixerEmail: string
    event: {
      id: number
      createdAt: string
      updatedAt: string
      ensembleName: string
      concertProgram: string
      confirmedOrOnHold: string
      dressCode: string
      fee: string
      additionalInfo: string
      fixerEmail: string
    }
  }[]
  sessionEmail: string
}

const daysArr = (selectedDate: moment.Moment, dateRange: number): { day: string; }[] => {
let arr: { day: string; }[] = [];
for (let day = moment(selectedDate); day < moment(selectedDate).add(dateRange, 'days'); day.add(1, 'days')) {
  arr = [...arr, {
    day: day.calendar(),
    
  }]
}
return arr
}


export default function DateRangeView(props: DateRangeViewProps) {
  const { selectedDate, dateRange, upcomingCalls, sessionEmail } = props

  return (
    <div data-testid="date-range-view" className="w-full p-4 m-2">
      {/* <h2>{`${selectedDate.calendar()} to ${selectedDate.add(dateRange, "days").calendar()}`}</h2> */}
      {daysArr(selectedDate, dateRange).map(i => (
        <div key={i.day} className="w-full ">
          <h3 className="text-md">{i.day}</h3>
            {upcomingCalls.filter(j => (
              String(moment(j.startTime).calendar()) 
              === String(moment(i.day).calendar())
              )).length > 0 
              ?upcomingCalls.filter(j => (
                String(moment(j.startTime).calendar()) 
                === String(moment(i.day).calendar())
                )).map(i => (
                <div key={i.id} className="w-full">
                 <EventTile call={i} sessionEmail={sessionEmail}/>
                </div>
              ))
              : <p className="p-1  mb-4 text-slate-600">No events on this day</p>
            }
        </div>
      ))}
      
    </div>
  )
}