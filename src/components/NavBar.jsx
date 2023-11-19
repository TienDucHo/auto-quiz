import { Button } from "./Button";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import AppLogo from "./AppLogo";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const auth = getAuth();

export function NavBar() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const curUser = auth.currentUser;

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

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
  return (!loading &&
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
        {curUser ? <img
          className="flex items-center justify-center w-14 rounded-full bg-secondary"
          src={curUser.photoURL}
          alt="Profile picture"
        ></img> : <></>}
      </div>
    </nav>
  );
}
