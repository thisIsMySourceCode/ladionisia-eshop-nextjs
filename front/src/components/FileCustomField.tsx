import { Field, useField } from "formik";
import _ from "lodash";
import { useState } from "react";

const FileCustomField = ({
  label = "",
  name,
  placeholder = "Escriba...",
  type = "text",
  required = true,
  onChange = (e) => {},
  ...FormikBag
}) => {
  const [field, meta, helpers] = useField({ ...FormikBag, name });
  let className = `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white 
    bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;


  // const isError = meta.touched && !_.isEmpty(meta.error)
  // if (isError)
  //   className +=
  //     " bg-red-700 bg-opacity-25 border-red-600 focus:border-red-600 ";
  // else
  //   className +=
  //     " bg-transparent focus:border-gray-500 ";
  // const [file, setFile] = useState({ name: '' })
  // const handleChangeImage = (e) => setFile(e.target.files[0])


  return (
    <Field
      name={name}
    >
      {({ field, form: { setFieldValue } }) => (
        <div>
          {label && (
            <label
              htmlFor={name}
              className="block text-sm font-bold mb-2"
            >
              {label}
            </label>
          )}
          <input
            {...field}
            className={className}
            type='file'
            name={name}
            onChange={(e: React.ChangeEvent<any>) => {
              setFieldValue(field.name, e.currentTarget.files[0]);
              // onChange(e.target.files[0]);
            }}
          />
        </div>
      )}
    </Field>
  );
}
 
export default FileCustomField;