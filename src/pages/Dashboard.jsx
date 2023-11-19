//#region imports
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { motion } from "framer-motion";
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

    // TODO: GET QUIZ SETS FROM FIREBASE
    const quizSetList = ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5", "Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"]

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

    // animation effects
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0,
                staggerChildren: 0.3
            }
        }
    };

    const childVariants = {
        hidden: {
            y: -20,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
            }
        }
    };


    return <div className="bg-black p-12 flex flex-col gap-y-12 md:gap-y-16">
        <NavBar onClick={handleClick} profilePic={curUser != null ? curUser.photoURL : null} />
        <div className="text-secondary font-bold flex justify-between">
            <Link to="/dashboard" className="text-3xl lg:text-4xl hover:text-accent transition ease-in-out">Dashboard</Link>
            {/* icon, text, onClick, style, textStyle */}
            <Button style="secondary" text="Add" icon={<IoAddOutline className="font-black text-2xl" />} />
        </div>
        <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            {/* TODO: ADD DELETE AND RENAME FUNCTIONALITY */}

            {quizSetList.map((quizName, index) => {
                return <motion.div key={index} variants={childVariants}>
                    <QuizSetDisplay quizName={quizName} />
                </motion.div>
            })}
        </motion.div>
    </div >
}

export default Dashboard;