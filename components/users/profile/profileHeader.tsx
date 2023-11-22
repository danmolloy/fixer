import { User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export type ProfileHeaderProps = {
  user: User
  setShowContactInfo: () => void
}

export default function ProfileHeader(props: ProfileHeaderProps) {
  const { user, setShowContactInfo } = props
  return (
    <div className="rounded-md flex flex-col sm:flex-row sm:items-center lg:w-2/3 border shadow-sm" data-testid="profile-header">
      <div className="flex flex-row w-full">
      <div className="rounded-full shadow overflow-hidden m-4" data-testid="profile-img">
          <Image src={"http://placebeard.it/200/200"} width={150} height={150} alt="Placeholder for a profile pic" title="Profile picture placeholder" />
      </div>
      <div className="flex flex-col w-full mt-4 mx-2 ">
        <h1 data-testid="user-name" className="text-2xl font-extrabold">
        {user.firstName} {user.lastName}
        </h1>
        {user.instrumentsList.map(i => (
          <p key={i} data-testid={`user-instrument-${i}`} className="text-lg text-slate-500">
          {i}
        </p>
        ))}
      </div>
      </div>
      <div className="flex flex-col">
        <button className="shadow hover:bg-blue-500 bg-blue-600 text-white m-2 sm:m-1 sm:mr-4 p-2 sm:px-4 rounded-md"  data-testid="profile-contact-btn" onClick={() => setShowContactInfo()}>
            Contact
          </button>
          <Link 
            className="shadow-sm hover:bg-slate-100 border border-slate-400 m-2 sm:m-1 sm:mr-4 p-2 sm:px-4 text-center rounded-md" 
            href={user.instrumentsList.length !== 1 ? `/directory` : `/directory/?instrument=${user.instrumentsList[0].toLowerCase()}`} 
            data-testid="directory-btn" >
              Directory
          </Link>
        </div>
    </div>
  )
}