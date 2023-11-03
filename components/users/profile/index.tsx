import React, { useState } from "react";
import ProfileHeader from "./profileHeader";
import ProfileBody from "./profileBody";
import ContactInfo from "../../directory/contactInfo";
import { User } from "@prisma/client";

export type UserProfileProps = {
  user: User
}

export default function UserProfile(props: UserProfileProps) {
  const { user } = props;
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);

  return (
    <div data-testid="user-profile" className="flex flex-col w-full ">
      <ProfileHeader userName={user.name} instrument={user.instrument} setShowContactInfo={() => setShowContactInfo(!showContactInfo)} />
      {showContactInfo && <ContactInfo player={user} setShowContactInfo={() => setShowContactInfo(!showContactInfo)}/>}
      <ProfileBody />
    </div>
  )
}