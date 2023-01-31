import { Field, useField } from "formik";

const CustomCheckbox = ({
  label = "",
  name,
  ...FormikBag
}) => {
  const [field, meta, helpers] = useField({ ...FormikBag, name });
  let className = `cursor-pointer w-5 h-5 my-auto`;

  return (
    <Field
      name={name}
      type="checkbox"
      value={FormikBag.value}
      lang="es"
    >
      {({ field, form: { setFieldValue } }) => (
        <div className="flex my-auto">
          <input
            {...field}
            className={className}
            type="checkbox"
            name={name}
          />
          {label && (
            <label
              htmlFor={name}
              className="block text-sm font-bold ml-2"
            >
              {label}
            </label>
          )}
        </div>
      )}
    </Field>
  );
}
 
export default CustomCheckbox;