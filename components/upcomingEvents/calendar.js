import { TextField } from "@mui/material";
import { CalendarPicker, DatePicker, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { useState } from "react";
 

export default function Calendar(props) {
  const { selectedDate, setSelectedDate} = props

  return (
    <div className="calendar-div"> 
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CalendarPicker date={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} />
      </LocalizationProvider>
    </div>
  )
}