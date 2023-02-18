import { TextField } from "@mui/material";
import { CalendarPicker, DatePicker, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import moment from "moment";
import React, { useState } from "react";
 
interface CalendarProps {
  selectedDate: moment.Moment
  setSelectedDate: (newDate: moment.Moment) => void
}

export default function Calendar(props: CalendarProps) {
  const { selectedDate, setSelectedDate} = props

  return (
    <div className="w-full md:w-1/2 bg-white" data-testid="date-picker-div"> 
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CalendarPicker date={selectedDate} onChange={(newDate) => setSelectedDate(moment(newDate))} />
      </LocalizationProvider>
    </div>
  )
}