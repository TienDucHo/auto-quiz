import { twMerge } from "tailwind-merge";
import { node, string, func } from "prop-types";

Button.propTypes = {
  icon: node,
  text: string,
  onClick: func,
  style: string,
  textStyle: string,
};

export function Button({ icon, text, onClick, style, textStyle }) {
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
  return (
    <button
      className={twMerge(
        "flex items-center justify-center gap-2 rounded-2xl px-6 py-2  active:brightness-75",
        buttonType,
        textStyle === "bold" ? "font-bold" : ""
      )}
      onClick={onClick}
    >
      {icon ? icon : <></>}
      {text}
    </button>
  );
}
