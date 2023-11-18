//#region imports
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
//#endregion

const auth = getAuth();
/**
 * Dashboard page component.
 * @returns {JSX.Element} Sign In page JSX element.
 */
const Dashboard = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (!user) navigate("/")
    }, [user, navigate])

    // console.log(JSON.stringify(user));
    // const displayName = user.displayName;
    // const email = user.email;
    // const photoURL = user.photoURL;

    // handle Google Sign out
    const handleClick = () => {
        signOut(auth).then(() => {
            navigate("/sign-in")
        }).catch((error) => {
            console.log("Error code", error.code)
            console.log("Error message", error.message)
        });
    }

    return <div className="flex items-center justify-center h-screen w-screen">
        <button onClick={handleClick}>Logout</button>
    </div>
}

export default Dashboard;