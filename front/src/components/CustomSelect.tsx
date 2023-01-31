import { Field, useField } from "formik";
import _ from "lodash";

const CustomSelect = ({
  label,
  name,
  placeholder = "Escriba...",
  required = true,
  children,
  onChange = (e) => {},
  value = "",
  ...FormikBag
}) => {
  const [field, meta, helpers] = useField({ ...FormikBag, name });
  let className = `text-white shadow appearance-none border rounded-lg w-full py-3 px-3 leading-tight focus:outline-none 
  focus:shadow-outline placeholder-gray-100`;


  const isError = meta.touched && !_.isEmpty(meta.error)
  if (isError)
    className +=
      " bg-red-700 bg-opacity-25 border-red-600 focus:border-red-600 ";
  else
    className +=
      " bg-[#3D3A35] border-black focus:border-gray-500  ";

  return (
    <Field name={name} value={FormikBag.value}>
      {({ field, form: { touched, errors, setFieldValue } }) => (
        <div>
          {label && (
            <label
              htmlFor={name}
              className="block text-xl font-bold mb-2 font-sans"
            >
              {label}
            </label>
          )}
          <div className="w-full">
            <select
              {...field}
              className={className}
              // {...(FormikBag.defaultValue
              //   ? { defaultValue: FormikBag.defaultValue }
              //   : {})
              // }
              defaultValue='select'
              name={name}
              placeholder={placeholder}
              onChange={(e: React.ChangeEvent<any>) => {
                setFieldValue(field.name, e.target.value);
                onChange(e.target.value);
              }}
            >
              {children}
            </select>
          </div>
        </div>
      )}
    </Field>
  );
}
 
export default CustomSelect;