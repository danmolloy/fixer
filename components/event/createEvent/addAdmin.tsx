import { Field } from "formik";

const mockUsers = ["Greg Ievers", "Roy Dereks", "Eoghan Kelly"]

export default function AddAdmin() {
  return (
    <div className="flex flex-col py-4" data-testid={`add-admin-div`}>
    <label htmlFor={"add-admin"} className="text-slate-700">Additional Admin
    <span className="text-slate-400 text-sm ml-2">Optional</span>
    </label>
    <div aria-labelledby="ensemble" role="checkbox-group">
      {mockUsers.map(i => (
        <label className="px-2 flex flex-row items-center " key={i}>
          {i}
        <Field
          className=" m-2"
          type="checkbox" name="checked" value={i}
        />
        </label>
      ))}
      <label key={"other"} className="px-2 flex flex-row items-center" >
          Other
        <Field
        className=" m-2"
          type="checkbox" name="checked"  value={"other"}
        />
        </label>
</div>
  </div>
  )
}