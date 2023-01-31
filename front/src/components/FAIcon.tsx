import { CSSProperties } from "react";

const FAIcon = ({
  type = "regular",
  name,
  size = "base",
  className= " "
}: {
  type?: "light" | "regular" | "solid";
  name: string;
  size?: "xs" | "sm" | "base" | "md" | "lg" | "xl";
  className?: string;
}) => {
  const style: CSSProperties = {
    fontSize: 0,
    height: 0,
    width: 0,
  };
  switch (size) {
    case "xl":
      style.fontSize = 45;
      style.height = 50;
      style.width = 50;
      break;
    case "lg":
      style.fontSize = 30;
      style.height = 45;
      style.width = 45;
      break;
    case "md":
      style.fontSize = 25;
      style.height = 33;
      style.width = 33;
      break;
    case "base":
      style.fontSize = 18;
      style.height = 25;
      style.width = 25;
      break;
    case "sm":
      style.fontSize = 15;
      style.height = 17;
      style.width = 17;
      break;
    case "xs":
      style.fontSize = 11;
      style.height = 15;
      style.width = 15;
      break;
  }

  return (
    <div
      className={"flex my-auto justify-center mx-auto " + className}
      style={{
        ...style,
      }}
    >
      <i className={`fa-${type} fa-${name} m-auto text-center mx-aut `}></i>
    </div>
  );
};

export default FAIcon;