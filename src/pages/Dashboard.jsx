//#region imports
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
//#endregion

//#region components
import { NavBar } from "../components/NavBar";
import QuizSetDisplay from "../components/QuizSetDisplay";
import { Button } from "../components/Button";
//#endregion

const auth = getAuth();
/**
 * Dashboard page component.
 * @returns {JSX.Element} Sign In page JSX element.
 */

const Dashboard = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth);
    const curUser = auth.currentUser;

    useEffect(() => {
        if (!user) navigate("/")
    }, [user, navigate])

    const handleClick = () => {
        signOut(auth).then(() => {
            navigate("/sign-in")
        }).catch((error) => {
            console.log("Error code", error.code)
            console.log("Error message", error.message)
        });
    }

    return <div className="bg-black p-12 flex flex-col gap-y-12 md:gap-y-16">
        <NavBar onClick={handleClick} profilePic={curUser.photoURL} />
        <div className="text-secondary font-bold flex justify-between">
            <Link to="/dashboard" className="text-3xl lg:text-4xl hover:text-accent transition ease-in-out">Dashboard</Link>
            {/* icon, text, onClick, style, textStyle */}
            <Button style="secondary" text="Add" icon={<IoAddOutline className="font-black text-2xl" />} />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <QuizSetDisplay quizName="Quiz 1" />
            <QuizSetDisplay quizName="Quiz 1" />
            <QuizSetDisplay quizName="Quiz 1" />
            <QuizSetDisplay quizName="Quiz 1" />
        </div>
    </div>
}

export default Dashboard;