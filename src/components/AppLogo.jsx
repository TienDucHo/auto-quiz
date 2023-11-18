import { Link } from "react-router-dom";

export default function AppLogo() {
  return (
    <Link
      to="/"
      className="flex text-xl font-bold mr-auto group cursor-pointer"
    >
      <p>
        AUTO <span className="text-accent">Q</span>
      </p>
      <p className="opacity-0 text-accent group-hover:opacity-100 ease-in-out transition duration-700">
        UIZ
      </p>
    </Link>
  );
}
