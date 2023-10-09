import React from "react"
import useSWR from "swr";
import Image from "next/image";
import DetailsDiv from "./detailsDiv";
import * as Yup from 'yup';
import axios from "axios";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function SettingsIndex() {
  const { data, mutate, error, isLoading } = useSWR(`/api/user/getUserDetails`, fetcher)

  if (isLoading) {
    return (
      <p>Loading</p>
    )
  }

  return (
    <div className="sm:border sm:shadow-sm p-1 sm:p-2 mb-4 rounded flex flex-col w-full md:w-3/4 ">
     <div>
     <DetailsDiv 
      updateData={() => mutate()}
      schemaValue={Yup.string().required("Name required")}
      inputType="text"
      id="user-name"
      displayTitle="Name"
      title="name"
      className=""
      userId={data.id}
      value={data.name} />
      <DetailsDiv 
        updateData={() => mutate()}
        schemaValue={Yup.string().email("Invalid Email").required("Email required")}
        inputType="email"
        id="email"
        displayTitle="Email"

        title="email"
        className=""
        userId={data.id}
        value={data.email} />
      <DetailsDiv 
        updateData={() => mutate()}
        schemaValue={Yup.number().required("Phone number required")}
        inputType="number"
        id="mobile"
        displayTitle="Mobile"
        title="mobileNumber"
        className=""
        userId={data.id}
        value={data.mobileNumber} />
        <DetailsDiv 
        updateData={() => mutate()}
        schemaValue={Yup.string().required("Instrument required")}
        inputType="text"
        id="instruments"
        title="instrument"
        displayTitle="Instrument(s)"
        className=""
        userId={data.id}
        value={data.instrument} />
        {/* <DetailsDiv 
      id="preferred-medium"
      title="Preferred Medium"
      className=""
      handleUpdate={(args) => handleUpdate(args)}
      userId={data.id}
      value={"WhatsApp"} /> */}
      {/* <div className="flex flex-col  p-4 w-full lg:justify-evenly">
      <div className="text-slate-600 text-sm lg:w-full flex flex-row justify-between">
      <p>Profile Image</p>
      <button className="hover:underline">
        Edit
      </button>
      </div>        <Image className="rounded-full ml-2 mt-2" src={"http://placebeard.it/200/200"} width={120} height={120} alt="Placeholder for a profile pic" title="Profile picture placeholder" />
      </div> */}
      {/* <DetailsDiv 
      id="fixing-ensembles"
      title="Ensembles You Fix"
      className=""
      value={`London Symphony Orchestra, BBC Symphony Orchestra`} /> */}
     {/*  <DetailsDiv 
      id="profile-cv"
      title="Your Profile CV"
      className=""
      value={`Lorem Ipsum`} /> */}
      {/* <DetailsDiv 
      id="blocked-users"
      title="Blocked Users"
      className=""
      value={"None specified"} /> */}
     </div>
   </div>
  )
}
