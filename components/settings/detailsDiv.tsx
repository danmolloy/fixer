import React, { useState } from "react"
import EditData from "./editData"
import { RequiredStringSchema } from "yup/lib/string"
import { RequiredNumberSchema } from "yup/lib/number"
import { AnyObject } from "yup/lib/types"
import axios from "axios"
import EditInstrument from "./editInstrument"
import { instrumentArr } from "../fixing/fixing"

export type DetailsDivProps = {
  id: string
  className: string
  title: string
  displayTitle?: string
  value: string
  updateData: () => void
  userId: string
  inputType: string
  schemaValue: RequiredStringSchema<string, AnyObject>|RequiredNumberSchema<number, AnyObject>
}

export default function DetailsDiv(props: DetailsDivProps) {
  const { updateData, displayTitle, id, className, title, value, userId, inputType } = props
  const [editData, setEditData] = useState(false)

  const handleUpdate = async (args: {data: {[x: string]: string}, userId: string}) => {
    axios.post("/api/user/update", args)
      .then(() => {
        updateData()
      }).then(async() => {
        setTimeout(() => setEditData(false), 250)
      })
  }


  return (
    <div className={`${className} flex flex-col  p-4 w-full lg:justify-evenly `} data-testid={id}>
      <div className="text-slate-600 text-sm lg:w-full flex flex-row justify-between">
      <p>{  displayTitle ? displayTitle : title}</p>
      <button onClick={() => setEditData(!editData)} className="hover:underline">
        Edit
      </button>
      </div>
      {editData && title === "instrument" 
      ? <EditInstrument options={instrumentArr} {...props} handleUpdate={(args) => handleUpdate(args)}  />
      : editData 
      ? <EditData {...props} handleUpdate={(args) => handleUpdate(args)} />
      : <p className="">{value === undefined || value === null ? "Not specified" : value}</p>}
    </div>
  )
}