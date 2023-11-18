import { Button } from "./Button";
import { FaArrowRightFromBracket, FaUser } from "react-icons/fa6";
import AppLogo from "./AppLogo";
export function NavBar() {
  return (
    <nav className="flex justify-between items-center">
      <AppLogo variant={"light"} />
      <div className="buttonContainer flex gap-2">
        <Button
          text="Logout"
          icon={<FaArrowRightFromBracket />}
          onClick={() => {}}
          style={"transparent"}
        />
        {/* Avatar */}
        <div className="flex items-center justify-center p-4 rounded-full bg-secondary">
          <FaUser />
        </div>
      </div>
    </nav>
  );
}
