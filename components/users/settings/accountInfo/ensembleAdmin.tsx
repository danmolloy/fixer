import { Field, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import TextInput from "../../../event/createUpdate/textInput";
import { useState } from "react";
import Link from "next/link";
import { Prisma } from "@prisma/client";

export type AdminWithEnsemble = Prisma.EnsembleAdminGetPayload<{
  include: {
    ensemble: true
  }
}>

export type EnsembleAdminProps = {
  ensembleAdminList: AdminWithEnsemble[]
}

export default function EnsembleAdmin(props: EnsembleAdminProps) {
  const { ensembleAdminList } = props;
  const [ensembleName, setEnsembleName] = useState<string>("")

  return (
    <div data-testid="ensemble-admin" className="p-1 my-4 flex flex-col items-center w-full">
      <h2 className="font-medium">Ensembles You Fix</h2>
      <p className="font-sm">Add ensembles you fix to save time and keep consistency in your bookings.</p>
      <p className="font-sm">If you are a player only, leave this section blank.</p>
      <div data-testid="fixing-ensembles-list" className="p-1 my-4 flex flex-col items-center w-full">
        <p className="font-medium">Current Ensembles</p>
      
            <div data-testid={"current-ensembles"} className=" flex flex-col w-full my-2">
      {ensembleAdminList.length > 0 
        ? ensembleAdminList.map((i, index) => (
          <div data-testid={`ensemble-${i.id}`} key={i.id} className="border bg-gray-50 rounded my-1 p-1 w-2/3 sm:w-1/2 flex flex-col items-start justify-between">
            <p className="font-medium">{i.ensemble.name}</p>
            <p className="text-sm">{i.positionTitle}</p>
          </div>
        ))
        : <p>You have no ensembles currently listed.</p>}
        
          <div className="flex flex-col py-4 w-full">
            <Link href="/ensembles/edit" className="text-indigo-600 hover:underline">
            Add Ensemble
            </Link>
          </div>
          </div>
      </div>
    </div>
  )
}