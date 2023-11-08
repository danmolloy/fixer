import { Field } from "formik";
import TextInput from "../../event/createEvent/textInput";
import Image from "next/image";

export default function ProfileInfo() {
  return (
    <div data-testid="profile-info">
      <TextInput
        label="Profile Blurb"
        id="profile-blurb-input"
        name="profileBlurb"
       />
       <div>
        <Image  src={"http://placebeard.it/200/200"} width={150} height={150} alt="Placeholder for a profile pic" title="Current Profile Image"/>
        <label htmlFor="image-input">Profile Image</label>
        <Field id="image-input" name="image" type="image"/>
       </div>
    </div>
  )
}