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
      eventTitle: string
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

export const daysArr = (selectedDate: moment.Moment, dateRange: number): { day: string; }[] => {
let arr: { day: string; }[] = [];
for (let day = moment(selectedDate); day < moment(selectedDate).add(dateRange, 'days'); day.add(1, 'days')) {
  arr = [...arr, {
    day: String(day),
    
  }]
}
return arr
}

export const eventDateFilter = (startTime: string, endTime: string, day: string): boolean => {
  if (
    moment(new Date(startTime)).isSame(moment(new Date(day)), "date") 
    || moment(new Date(endTime)).isSame(moment(new Date(day)), "date") 
    ) {
    return true;
  }
  return false;
}

export const eventDateArr = (startTime: string, endTime: string, day: string): {}[] => {
  return [{}]
}


export default function DateRangeView(props: DateRangeViewProps) {
  const { selectedDate, dateRange, upcomingCalls, sessionEmail } = props

  return (
    <div data-testid="date-range-view" className="w-full py-4 sm:p-4">
      {/* <h2>{`${selectedDate.calendar()} to ${selectedDate.add(dateRange, "days").calendar()}`}</h2> */}
      {daysArr(selectedDate, dateRange).map(i => (
        <div key={i.day} className="w-full border my-2 px-2 py-3 shadow-sm">
          <h3 className="text-md text-slate-700">
            {moment(new Date(i.day)).format("dddd Do MMMM YYYY")}
          </h3>
            {upcomingCalls.filter(j => (
              eventDateFilter(j.startTime, j.endTime, i.day) === true )).length > 0
              ? upcomingCalls.filter(j => (
                eventDateFilter(j.startTime, j.endTime, i.day) === true)
                ).map(i => (
                <div key={i.id} className="w-full">
                 <EventTile call={i} sessionEmail={sessionEmail}/>
                </div>
              ))
              : <p className="text-center p-4 h-24 text-slate-600">No events on this day</p>
            }
        </div>
      ))}
    </div>
  )
}