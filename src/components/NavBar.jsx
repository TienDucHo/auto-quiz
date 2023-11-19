import { Button } from "./Button";
import { FaArrowRightFromBracket, FaUser } from "react-icons/fa6";
import AppLogo from "./AppLogo";
import PropTypes from 'prop-types';

NavBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export function NavBar({ onClick }) {
  return (
    <nav className="flex justify-between items-center">
      <AppLogo variant={"light"} />
      <div className="buttonContainer flex gap-x-4 opacity-70">
        <Button
          text="Logout"
          icon={<FaArrowRightFromBracket />}
          onClick={onClick}
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