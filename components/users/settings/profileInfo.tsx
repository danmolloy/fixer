import { Field } from "formik";
import TextInput from "../../event/createUpdate/textInput";
import Image from "next/image";

export default function ProfileInfo() {
  return (
    <div data-testid="profile-info" className="p-1 my-8 flex flex-col items-center w-full">
            <h2>Profile Information</h2>

       <div>
        <Image className="w-full flex flex-col py-4 "  src={"http://placebeard.it/200/200"} width={150} height={150} alt="Placeholder for a profile pic" title="Current Profile Image"/>
        <label htmlFor="image-input" className="font-medium">Profile Image</label>
{/*         <Field id="image-input" name="image" type="image"/>
 */}       </div>
 <TextInput
                 asHtml="textarea" 

        label="Profile Blurb"
        id="profile-blurb-input"
        name="profileBlurb"
       />
    </div>
  )
}