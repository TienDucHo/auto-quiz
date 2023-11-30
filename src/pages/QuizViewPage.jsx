//#region imports
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaQuestion, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LuCheckCircle } from "react-icons/lu";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "framer-motion";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import { EffectFlip } from 'swiper/modules';
//#endregion

//#region components
import { NavBar } from "../components/NavBar";
import QuestionPage from "../components/QuestionPage";
//#endregion

//#region firebase
import { db } from "../auth/Config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

//#endregion

const auth = getAuth();

export default function QuizViewPage() {
    const { attemptId, quizId } = useLoaderData();
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const swiperRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [answersList, setAnswersList] = useState([])

    // store data pulled from firebase
    const [quizName, setQuizName] = useState("")
    const [quizScore, setQuizScore] = useState(null)
    const [numQuestions, setNumQuestions] = useState(0)
    const [questionsList, setQuestionsList] = useState([])
    const fields = [{ icon: <FaQuestion />, text: `${numQuestions}` }]
    const afterFields = [{ icon: <LuCheckCircle />, text: `${quizScore} / ${numQuestions}` }, { icon: <IoReturnDownBackOutline />, text: "Back" }]

    //#region sumbission
    const handleSubmit = async () => {
        let myList = []
        for (let i = 0; i < numQuestions; i++) {
            var selValue = document.querySelector(`input[name="${i}"]:checked`);
            selValue === null ? myList.push(null) : myList.push(selValue.value)
        }
        // calculate score
        let score = 0
        for (let i = 0; i < numQuestions; i++) {
            if (myList[i] === questionsList[i].rightAnswer) {
                score = score + 1
            }
        }
        const docRef = doc(db, "users", user.uid, "quizSets", quizId, "attempts", attemptId);
        // update data
        await updateDoc(docRef, {
            userAnswers: myList,
            score: score,
        })
        navigate(`/quiz/${quizId}`)
    }
    //#endregion
    //#region save
    const handleSave = async () => {
        let myList = []
        for (let i = 0; i < numQuestions; i++) {
            var selValue = document.querySelector(`input[name="${i}"]:checked`);
            // console.log(document.querySelector(`input[name="${i}"]:checked`))
            selValue === null ? myList.push(null) : myList.push(selValue.value)
        }
        const docRef = doc(db, "users", user.uid, "quizSets", quizId, "attempts", attemptId);
        await updateDoc(docRef, {
            userAnswers: myList
        })
        navigate(`/quiz/${quizId}`)
    }
    //#endregion

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
        else {
            const getName = async (user) => {
                const docSnap = await getDoc(doc(db, "users", user.uid, "quizSets", quizId));
                if (docSnap.exists()) {
                    setQuizName(docSnap.data().name);
                } else { console.log("No such document") }
            }

            const getQuestions = async (user) => {
                const docRef = doc(db, "users", user.uid, "quizSets", quizId, "attempts", attemptId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setNumQuestions(docSnap.data().numQuestions);
                    setQuizScore(docSnap.data().score);

                    const questions = docSnap.data().questions.map((element, index) => ({
                        question: element.question,
                        answers: element.answers,
                        index: index,
                        rightAnswer: element.rightAnswer,
                    }));
                    setQuestionsList(questions);

                    // update userAnswers
                    if (docSnap.data().userAnswers != null) {
                        setAnswersList(docSnap.data().userAnswers)
                    }

                } else { console.log("No such document") }
            }
            getName(user);
            getQuestions(user);
        }
    }, [user, loading, navigate, quizId, attemptId])


    //#region animation effects
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.3,
            },
        },
    };

    const childVariants = {
        hidden: {
            x: -20,
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 2,
            },
        },
    };
    //#endregion

    return (
        <div className="p-12 lg:h-[100vh] flex flex-col gap-y-12 text-white">
            <NavBar />
            <div className="lg:grid lg:grid-cols-3 w-full h-full flex flex-col gap-y-8 items-center justify-center" >
                <motion.div className="flex lg:flex-col gap-y-8 md:justify-center w-full" variants={containerVariants} initial="hidden" animate="visible">
                    <div className="flex flex-col w-full gap-y-8">
                        <motion.p className="text-secondary font-bold text-4xl lg:text-5xl" variants={childVariants}>{quizName}</motion.p>
                        <motion.div className="flex flex-col gap-y-2 text-lg lg:text-xl" variants={childVariants}>
                            {quizScore === null ? fields.map((field, index) => {
                                return <div key={index} className="flex items-center gap-x-4">
                                    {field.icon}
                                    <p>{field.text}</p>
                                </div>
                            }) : <motion.div className="flex flex-col items-start gap-y-4">
                                {afterFields.map((field, index) => {
                                    return index === 0 ? <div key={index} className="flex items-center gap-x-4">
                                        {field.icon}
                                        <p>{field.text}</p>
                                    </div> : <button key={index} className="flex items-center gap-x-4 hover:text-accent transition duration-100" onClick={() => navigate(`/quiz/${quizId}`)}>
                                        {field.icon}
                                        <p>{field.text}</p>
                                    </button>
                                })}
                            </motion.div>}
                        </motion.div>
                    </div>
                    {quizScore === null ?
                        <motion.div className="w-full flex flex-col lg:flex-row gap-y-4 items-end md:justify-between md:w-[50%] gap-x-6 md:gap-x-8" variants={childVariants}>
                            <button className="w-32 rounded-2xl border border-secondary py-3 px-8 hover:bg-primary hover:text-white hover:border-primary" onClick={handleSave}>Save</button>
                            <button className="w-32 rounded-2xl bg-secondary text-black py-3 px-8 hover:bg-primary hover:text-white hover:border-accent" onClick={handleSubmit}>Submit</button>
                        </motion.div> : <></>}
                </motion.div>
                <motion.div className="col-span-2 flex items-center justify-center gap-x-2 w-full h-full lg:flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}>
                    <FaChevronLeft className={`hidden lg:flex cursor-pointer text-5xl transition ease-linear ${activeIndex <= 0 ? "opacity-20 cursor-default" : "opacity-100"}`}
                        onClick={() => {
                            setActiveIndex(swiperRef.current.swiper.activeIndex - 1)
                            swiperRef.current.swiper.slideTo(swiperRef.current.swiper.activeIndex - 1);
                        }} />
                    <Swiper
                        ref={swiperRef}
                        effect={'flip'}
                        modules={[EffectFlip]}
                        className="w-full lg:w-[80%] max-h-[20rem] flex items-center justify-center my-28"
                        onSlideChange={(e) => setActiveIndex(e.activeIndex)}
                        simulateTouch={false}
                    >
                        {questionsList.map((question, questionIndex) => {
                            return <SwiperSlide key={questionIndex} className="flex h-[90%] z-[100] max-h-[40rem] items-center justify-center">
                                <QuestionPage list={question.answers} question={question.question} questionIndex={question.index} userAnswers={answersList} modifiable={parseInt(quizScore) === quizScore ? false : true} />
                            </SwiperSlide>
                        })}

                    </Swiper>
                    <FaChevronRight className={`hidden lg:flex cursor-pointer text-5xl transition ease-linear ${activeIndex >= questionsList.length - 1 ? "opacity-20 cursor-default" : "opacity-100"}`} onClick={() => {
                        setActiveIndex(swiperRef.current.swiper.activeIndex + 1)
                        swiperRef.current.swiper.slideTo(swiperRef.current.swiper.activeIndex + 1);
                    }} />
                </motion.div>
            </div >
        </div >
    )
}