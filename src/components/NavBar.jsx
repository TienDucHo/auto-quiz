import { Button } from "./Button";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import AppLogo from "./AppLogo";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

export function NavBar() {
  const navigate = useNavigate();
  const curUser = auth.currentUser;

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/sign-in");
      })
      .catch((error) => {
        console.log("Error code", error.code);
        console.log("Error message", error.message);
      });
  };
  return (
    curUser && (
      <nav className="flex justify-between items-center">
        <AppLogo variant={"light"} />
        <div className="buttonContainer flex gap-x-4">
          <Button
            text="Logout"
            icon={<FaArrowRightFromBracket />}
            onClick={handleClick}
            style={"transparent"}
          />
          {/* Avatar */}
          <img
            className="flex items-center justify-center w-14 rounded-full bg-secondary"
            src={curUser.photoURL}
            alt="Profile picture"
          ></img>
        </div>
      </nav>
    )
  );
}
