//#region imports
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaClock, FaQuestion, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import { EffectFlip } from 'swiper/modules';
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

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [curQuestion, setCurQuestion] = useState(0);
    const swiperRef = useRef(null)
    const fields = [{ icon: <FaClock />, text: "1 hour 5 minutes" }, { icon: <FaQuestion />, text: "1 / 25" }]


    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading, navigate])

    useEffect(() => {
        if (swiperRef) {
            setCurQuestion(swiperRef.current.swiper.activeIndex)
            console.log(curQuestion)
        }
    }, [swiperRef, curQuestion])

    return (
        <div className="p-12 h-screen flex flex-col gap-y-12 text-white">
            <NavBar />
            <div className="md:grid md:grid-cols-2 w-full h-full flex flex-col gap-y-8 items-center justify-center">
                <div className="flex md:flex-col gap-y-8 md:justify-center w-full">
                    <div className="flex flex-col w-full gap-y-8">
                        <p className="text-secondary font-bold text-4xl lg:text-5xl">{quizName}</p>
                        <div className="flex flex-col gap-y-2 text-lg lg:text-xl">
                            {fields.map((field, index) => {
                                return <div key={index} className="flex items-center gap-x-4">
                                    {field.icon}
                                    <p>{field.text}</p>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row gap-y-4 items-end md:justify-between md:w-[50%] gap-x-6 md:gap-x-8">
                        <button className="w-[8rem] md:w-full rounded-2xl border border-secondary py-3 px-8 hover:bg-primary hover:text-white hover:border-primary">Save</button>
                        <button className="w-[8rem] md:w-full rounded-2xl bg-secondary text-black py-3 px-8 hover:bg-primary hover:text-white hover:border-accent">Submit</button>
                    </div>
                </div>
                {/* <div className="flex items-center justify-end w-full">
                    <QuestionPage list={["France", "USA", "Denmark", "Germany"]} question="Who participated in the Vietname War" questionIndex={1} />
                </div> */}
                <div className="flex items-center justify-center gap-x-2 w-full lg:flex-1">
                    <FaChevronLeft className="hidden lg:flex cursor-pointer text-5xl"
                        onClick={() => {
                            swiperRef.current.swiper.slideTo(swiperRef.current.swiper.activeIndex - 1);
                        }} />
                    <Swiper
                        ref={swiperRef}
                        effect={'flip'}
                        modules={[EffectFlip]}
                        className="w-full lg:w-[80%] flex items-center justify-center"
                        onSlideChange={(e) => console.log(e.realIndex)}
                        onSlide
                    >
                        <SwiperSlide className="flex items-center justify-center">
                            <QuestionPage list={["France", "USA", "Denmark", "Germany"]} question="Who participated in the Vietname War" questionIndex={1} />
                        </SwiperSlide>
                        <SwiperSlide className="flex items-center justify-center">
                            <QuestionPage list={["France", "USA", "Denmark", "Germany"]} question="Who participated in the Vietname War" questionIndex={2} />
                        </SwiperSlide>
                    </Swiper>
                    <FaChevronRight className="hidden lg:flex cursor-pointer text-5xl" onClick={() => {
                        console.log(swiperRef)
                        swiperRef.current.swiper.slideTo(swiperRef.current.swiper.activeIndex + 1);
                    }} />
                </div>
            </div>
        </div >
    )
}
