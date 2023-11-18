import AppLogo from "../../components/AppLogo";
import { Button } from "../../components/Button";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function Summary() {
  return (
    <div className="flex flex-col justify-center">
      {/* Nav Bar */}
      <nav className="flex justify-between items-center">
        <AppLogo />
        <div className="buttonContainer flex gap-2">
          <Button
            text="Logout"
            icon={<FaArrowRightFromBracket />}
            onClick={() => {}}
            style={"transparent"}
          />
        </div>
      </nav>
      {/* Header */}
      {/* Attempt Table */}
    </div>
  );
}
