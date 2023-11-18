//#region imports
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../auth/Config";
import { motion } from "framer-motion";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import SignInPic from "../assets/sign_in.svg";

//#endregion


const myAuth = getAuth();
/**
 * Sign In page component.
 * @returns {JSX.Element} Sign In page JSX element.
*/
const SignIn = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(myAuth);

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard")
    }, [user, navigate, loading])

    // handle Google Sign in
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            const curToken = GoogleAuthProvider.credentialFromResult(data).accessToken;
            localStorage.setItem("accessToken", curToken)
            navigate("/dashboard")
        }).catch((error) => {
            console.log("Error code", error.code)
            console.log("Error message", error.message)
        });
    }

    return !loading && <div className="bg-secondary text-black flex flex-col h-screen p-8 md:p-0">
        <div className="grid h-full lg:grid-cols-2">
            <motion.div className="flex flex-col h-full md:p-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>
                <Link to="/" className="flex text-xl font-bold mr-auto group cursor-pointer">
                    <p>AUTO <span className="text-accent">Q</span></p>
                    <p className="opacity-0 text-accent group-hover:opacity-100 ease-in-out transition duration-700">UIZ</p>
                </Link>
                <div className="h-full min-w-[28rem] lg:w-[70%] flex flex-col gap-y-8 justify-center items-start">
                    <p className="text-5xl lg:text-5xl font-bold"><span className="text-accent">Start</span> your journey with us</p>
                    <p className="text-lg lg:text-xl opacity-70">Begin your educational escapade with us today and turn every lesson into a sensational adventure</p>
                    <button className="text-lg lg:text-xl flex items-center bg-primary text-white py-3 px-8 rounded-2xl mr-auto" onClick={handleClick}>
                        <FcGoogle />
                        <p className="ml-2">Sign in with Google</p>
                    </button>
                </div>
            </motion.div>
            <div className="hidden lg:flex items-center justify-center w-full h-full bg-black">
                <motion.img src={SignInPic} alt="Sign In Picture" className="w-[80%] h-[80%]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }} />
            </div>
        </div>
    </div>
}

export default SignIn;