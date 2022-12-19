import { ErrorMessage, Field } from "formik";
import { TextField } from "formik-mui";

export default function TextInput(props) {
  const { multiline, name, title, id, className, label } = props;

  return (
    <div className="flex flex-col py-2" data-testid={`${id}-div`}>
      <Field
        multiline
        rows={props.multiline === true ? 4 : 1}
        component={TextField}
        label={label ? label : name}
        data-testid={`${id}-input`}
        className={className}
        type="text"
        /* onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.fee} */
        name={name}
      />
      {/* <ErrorMessage name="fee">
        { msg => <div className="form-error" data-testid={`${id}-error`}>{msg}</div> }
      </ErrorMessage> */}
    </div>
  )
}