import React from "react"
import useSWR from "swr";
import Image from "next/image";
import DetailsDiv from "./detailsDiv";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function SettingsIndex() {
  const { data, error, isLoading } = useSWR(`/api/user/getUserDetails`, fetcher)

  if (isLoading) {
    return (
      <p>Loading</p>
    )
  }

  return (
    <div className="sm:border sm:shadow-sm p-1 sm:p-2 mb-4 rounded flex flex-col w-full md:w-3/4 ">
     <div>
     <DetailsDiv 
      id="user-name"
      title="Name"
      className=""
      value={data.name} />
      <DetailsDiv 
      id="email"
      title="Email"
      className=""
      value={data.email} />
      <DetailsDiv 
      id="mobile"
      title="Mobile"
      className=""
      value={"07444 777 333"} />
      <DetailsDiv 
      id="preferred-medium"
      title="Preferred Medium"
      className=""
      value={"WhatsApp"} />
      <DetailsDiv 
      id="instruments"
      title="Instruments"
      className=""
      value={data.instrument} />
      <div className="flex flex-col  p-4 w-full lg:justify-evenly">
      <div className="text-slate-600 text-sm lg:w-full flex flex-row justify-between">
      <p>Profile Image</p>
      <button className="hover:underline">
        Edit
      </button>
      </div>        <Image className="rounded-full ml-2 mt-2" src={"http://placebeard.it/200/200"} width={120} height={120} alt="Placeholder for a profile pic" title="Profile picture placeholder" />
      </div>
      <DetailsDiv 
      id="fixing-ensembles"
      title="Ensembles You Fix"
      className=""
      value={`London Symphony Orchestra, BBC Symphony Orchestra`} />
      <DetailsDiv 
      id="profile-cv"
      title="Your Profile CV"
      className=""
      value={`Lorem Ipsum`} />
      <DetailsDiv 
      id="blocked-users"
      title="Blocked Users"
      className=""
      value={"None specified"} />
     </div>
   </div>
  )
}
