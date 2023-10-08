import { TextField } from "@mui/material";
import { CalendarPicker, DatePicker, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import moment from "moment";
import React, { useState } from "react";
import ButtonPrimary from "../index/buttonPrimary";
 
interface CalendarProps {
  selectedDate: moment.Moment
  setSelectedDate: (newDate: moment.Moment) => void
}

/* 
Possibly insignificant bug: mobile selector gives new Date(), 
whereas CalendarPicker gives Date() from when page was loaded
*/

export default function Calendar(props: CalendarProps) {
  const { selectedDate, setSelectedDate} = props

  return (
    <div className="md:sticky md:top-20 md:h-screen md:flex md:justify-center w-full md:w-1/2 bg-white" data-testid="date-picker-div"> 
{/*       <ButtonPrimary handleClick={() => {}} id="add-calendar-btn" text="Add to Diary" className="self-end w-28 text-blue-500 border-blue-500 hover:bg-blue-50" />
 */}      
      <div className="hidden md:flex w-full  md:absolute ">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CalendarPicker  date={selectedDate} onChange={(newDate) => setSelectedDate(moment(newDate))} /> 
        </LocalizationProvider>
      </div>
      <div className="md:hidden p-2 flex flex-col items-center">
        <input 
          className="border border-zinc-400 rounded p-1 shadow-sm"
          type="date" 
          id="start" 
          name="date-picker"
          value={selectedDate.format("YYYY-MM-DD")}
          onChange={(e) => setSelectedDate(moment(new Date(e.target.value)))}
          min="2023-01-01" max="2028-12-31" />
      </div>
    </div>
  )
}