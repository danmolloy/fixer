import React from "react";
import ProfileHeader from "./profileHeader";
import ProfileBody from "./profileBody";

interface UserProfileProps {
  user: {
    name: string
    instrument: string
  }
}

export default function UserProfile(props: UserProfileProps) {
  const { user } = props
  return (
    <div data-testid="user-profile-div" className="flex flex-col w-full ">
      <ProfileHeader userName={user.name} instrument={user.instrument}/>
      <ProfileBody />
    </div>
  )
}