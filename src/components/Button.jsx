import { twMerge } from "tailwind-merge";
import { node, string, func, bool } from "prop-types";

Button.propTypes = {
  className: string,
  icon: node,
  text: string,
  onClick: func,
  style: string,
  textStyle: string,
  type: string,
  disable: bool,
};

export function Button({
  className,
  icon,
  text,
  onClick,
  style,
  type,
  textStyle,
  disable,
}) {
  let buttonType = "";
  switch (style) {
    case "primary":
      buttonType =
        "bg-primary text-white hover:bg-secondary hover:text-primary";
      break;
    case "transparent":
      buttonType = "text-white p-0 hover:text-accent";
      break;
    default:
      buttonType =
        "bg-secondary text-primary  hover:bg-primary hover:text-secondary";
      break;
  }
  if (disable) {
    buttonType =
      "opacity-25 active:brightness-100 hover:cursor-not-allowed";
  }
  return (
    <button
      className={twMerge(
        "flex items-center justify-center gap-2 rounded-2xl px-6 py-2 active:brightness-75",
        buttonType,
        textStyle === "bold" ? "font-bold" : "",
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disable}
    >
      {icon ? icon : <></>}
      {text}
    </button>
  );
}
