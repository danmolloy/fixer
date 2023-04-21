import React, { useState } from "react";
import ProfileHeader from "./profileHeader";
import ProfileBody from "./profileBody";
import ContactInfo from "../directory/contactInfo";

interface UserProfileProps {
  user: {
    name: string
    instrument: string
    email: string
    id: string
  }
}

export default function UserProfile(props: UserProfileProps) {
  const { user } = props;
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);

  return (
    <div data-testid="user-profile-div" className="flex flex-col w-full ">
      {showContactInfo && <ContactInfo player={user} setShowContactInfo={() => setShowContactInfo(!showContactInfo)}/>}

      <ProfileHeader userName={user.name} instrument={user.instrument} setShowContactInfo={() => setShowContactInfo(!showContactInfo)} />
      <ProfileBody />
    </div>
  )
}