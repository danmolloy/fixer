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

export default function Calendar(props: CalendarProps) {
  const { selectedDate, setSelectedDate} = props

  return (
    <div className="flex flex-col w-full md:w-1/2 bg-white" data-testid="date-picker-div"> 
      <ButtonPrimary handleClick={() => {}} id="add-calendar-btn" text="Add to Diary" className="self-end w-28 text-blue-500 border-blue-500 hover:bg-blue-50" />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CalendarPicker date={selectedDate} onChange={(newDate) => setSelectedDate(moment(newDate))} />
      </LocalizationProvider>
    </div>
  )
}