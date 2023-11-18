import { string } from "prop-types";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

AppLogo.propTypes = {
  variant: string,
};

export default function AppLogo({ variant }) {
  return (
    <Link
      to="/"
      className="flex text-xl font-bold mr-auto group cursor-pointer"
    >
      <p
        className={twMerge(
          variant === "light" ? "text-white" : "text-black"
        )}
      >
        AUTO <span className="text-accent">Q</span>
      </p>
      <p className="opacity-0 text-accent group-hover:opacity-100 ease-in-out transition duration-700">
        UIZ
      </p>
    </Link>
  );
}
