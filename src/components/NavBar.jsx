import { Button } from "./Button";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import AppLogo from "./AppLogo";
import PropTypes from 'prop-types';

NavBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  profilePic: PropTypes.string,
};

export function NavBar({ onClick, profilePic }) {
  return (
    <nav className="flex justify-between items-center">
      <AppLogo variant={"light"} />
      <div className="buttonContainer flex gap-x-4">
        <Button
          text="Logout"
          icon={<FaArrowRightFromBracket />}
          onClick={onClick}
          style={"transparent"}
        />
        {/* Avatar */}
        <img className="flex items-center justify-center w-14 rounded-full bg-secondary" src={profilePic} alt="Profile picture">
        </img>
      </div>
    </nav>
  );
}