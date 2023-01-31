import { EGenericButtonType } from "../utils/general";

export interface IGenericButton {
  label: string;
  onClick?: any;
  type?: "submit" | "reset" | "button";
  buttonType?: EGenericButtonType;
  isDisabled?: boolean;
  size?: "sm" | "base" | "md" | "lg";
}

const GenericButton = ({
  buttonType = EGenericButtonType.PRIMARY,
  label,
  type = "button",
  isDisabled,
  onClick,
  size = "base",
}: IGenericButton) => {
  
  let className = "  ";

  switch (buttonType) {
    case EGenericButtonType.PRIMARY:
      className += " border border-black px-8 py-4 text-black active:bg-gray-500 active:bg-opacity-20 hover:bg-gray-500 hover:bg-opacity-20 font-bold text-xl rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ";
      break;
    case EGenericButtonType.CLOSE:
      className += "  border border-red-500 px-8 py-4 text-red-500 active:bg-red-600 active:bg-opacity-20 hover:bg-red-600 hover:bg-opacity-20 font-bold text-xl rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ";
      break;
  }

  switch (size) {
    case "sm":
      className += ` ${className} text-sm px-4 py-1`;
      break;
    case "base":
      className += ` ${className} text-base px-6 py-3`;
      break;
    case "md":
      className += ` ${className} text-md px-8 py-2`;
      break;
    case "lg":
      className += ` ${className} text-lg px-10 py-4`;
      break;
  }

  return ( 
    <div className="flex">
      <button
        className={className}
        type={type}
        onClick={() => onClick && onClick()}
        disabled={isDisabled}
      >
        {label}
      </button>
    </div>
  );
}
 
export default GenericButton;