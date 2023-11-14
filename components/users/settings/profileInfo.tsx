import { Field } from "formik";
import TextInput from "../../event/createUpdate/textInput";
import Image from "next/image";

export default function ProfileInfo() {
  return (
    <div data-testid="profile-info" className="p-1 my-4 flex flex-col items-center w-full">
      <TextInput
        label="Profile Blurb"
        id="profile-blurb-input"
        name="profileBlurb"
       />
       <div>
        <Image className="w-full flex flex-col py-4 "  src={"http://placebeard.it/200/200"} width={150} height={150} alt="Placeholder for a profile pic" title="Current Profile Image"/>
        <label htmlFor="image-input" className="font-medium">Profile Image</label>
{/*         <Field id="image-input" name="image" type="image"/>
 */}       </div>
    </div>
  )
}