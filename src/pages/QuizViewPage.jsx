//#region imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaClock, FaQuestion } from "react-icons/fa6";
//#endregion

//#region components
import { NavBar } from "../components/NavBar";
import QuestionPage from "../components/QuestionPage";
//#endregion

// Firebase

const auth = getAuth();

export default function QuizViewPage() {
    //TODO: GET QUIZ NAME FROM FIREBASE
    const quizName = "French";
    const fields = [{ icon: <FaClock />, text: "1 hour 5 minutes" }, { icon: <FaQuestion />, text: "1/25" }]

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading, navigate])



    return (
        <div className="p-12 h-screen flex flex-col gap-y-12 text-white">
            <NavBar />
            <div className="grid grid-cols-2 w-full h-full">
                <div className="flex flex-col gap-y-8 justify-center w-full">
                    <p className="text-secondary font-bold text-4xl lg:text-5xl">{quizName}</p>
                    <div className="flex flex-col gap-y-2 text-lg lg:text-xl">
                        {fields.map((field, index) => {
                            return <div key={index} className="flex items-center gap-x-4">
                                {field.icon}
                                <p>{field.text}</p>
                            </div>
                        })}
                    </div>
                    <div className="flex justify-between md:w-[50%] gap-x-6 md:gap-x-8">
                        <button className="w-full rounded-2xl border border-secondary py-3 px-8 hover:bg-primary hover:text-white hover:border-primary">Save</button>
                        <button className="w-full rounded-2xl bg-secondary text-black py-3 px-8 hover:bg-primary hover:text-white hover:border-accent">Submit</button>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <QuestionPage list={["France", "USA", "Denmark", "Germany"]} question="Who participated in the Vietname War" questionIndex={1} />
                </div>
            </div>
        </div>
    )
}
