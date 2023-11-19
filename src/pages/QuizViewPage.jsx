//#region imports
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
<<<<<<< HEAD
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaClock, FaQuestion, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "framer-motion";
=======
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../components/Button";
import {
  FaClock,
  FaQuestion,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
>>>>>>> 8574c16 (Finished but cannot save quiz attempt yet)

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
//#endregion

//#region components
import { NavBar } from "../components/NavBar";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../auth/Config";

//#endregion

// Firebase

const auth = getAuth();

export default function QuizViewPage() {
  //TODO: GET QUIZ NAME FROM FIREBASE
  const { attemptId, quizId } = useLoaderData();

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [curQuestion, setCurQuestion] = useState(0);
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  //   const swiperRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    else {
      const getQuizName = async () => {
        const docSnapshot = await getDoc(
          doc(db, "users", user.uid, "quizSets", quizId)
        );
        if (docSnapshot.exists()) {
          console.log("Document data:", docSnapshot.data());
          setQuizName(docSnapshot.data().name);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      };

      const getQuestions = async () => {
        const docSnapshot = await getDoc(
          doc(
            db,
            "users",
            user.uid,
            "quizSets",
            quizId,
            "attempts",
            attemptId
          )
        );
        if (docSnapshot.exists()) {
          console.log("Document data:", docSnapshot.data());
          setQuestions(docSnapshot.data().questions);
          setUserAnswers(
            docSnapshot.data().questions.map(() => null)
          );
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      getQuizName();
      getQuestions();
    }
  }, [user, loading, navigate, quizId, attemptId]);

  //   useEffect(() => {
  //     if (swiperRef) {
  //       setCurQuestion(swiperRef.current.swiper.activeIndex);
  //       console.log(curQuestion);
  //     }
  //   }, [swiperRef, curQuestion]);

  const fields = [
    { icon: <FaClock />, text: "1 hour 5 minutes" },
    {
      icon: <FaQuestion />,
      text: `${curQuestion + 1}/${questions.length}`,
    },
  ];

  const navigateQuestion = (direction) => {
    if (
      (direction < 0 && curQuestion > 0) ||
      (direction > 0 && curQuestion < questions.length - 1)
    ) {
      setCurQuestion(curQuestion + direction);
    }
  };

  return (
    <div className="p-12 h-screen flex flex-col gap-y-12 text-white">
      <NavBar />
      {questions.length > 0 && (
        <div className="flex flex-1 justify-between items-center p-y-2">
          {/* Quiz Info */}
          <div className="flex flex-col gap-y-8">
            <div className="textInfo flex flex-col gap-y-8">
              <h1 className="text-secondary font-bold text-4xl lg:text-5xl">
                {quizName}
              </h1>
              <div className="flex flex-col gap-y-2 text-lg lg:text-xl">
                {fields.map((field, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-x-4"
                    >
                      {field.icon}
                      <p>{field.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex md:flex-row gap-y-4 items-center md:justify-between md:w-[50%] gap-x-2 md:gap-x-4">
              <Button
                className={
                  "flex-grow rounded-2xl border border-secondary py-3 px-8 hover:border-primary"
                }
                text={"Save"}
                style={"transparent"}
                onClick={() => {
                  navigate(-1);
                }}
              />
              <Button
                className={"flex-grow py-3 px-8"}
                text={"Submit"}
              />
            </div>
          </div>
          {/* Carousel */}
          <div className="flex justify-center items-center gap-4">
            <Button
              icon={<FaChevronLeft className="text-6xl" />}
              style={"transparent"}
              onClick={() => {
                navigateQuestion(-1);
              }}
            />
            <div className="p-12 w-[28rem] h-[28rem] bg-primary rounded-2xl flex flex-col justify-center items-center gap-8">
              <div className="w-full flex flex-col gap-1">
                <h2 className="text-secondary text-2xl">
                  Q{curQuestion + 1}
                </h2>
                <p className="text-white text-2xl">
                  {questions[curQuestion].question}
                </p>
              </div>
              <div className="answerContainer w-full flex flex-col justify-center items-start gap-4">
                {questions[curQuestion].answers.map((elem, id) => {
                  return (
                    <div
                      key={id}
                      id={id}
                      className="flex justify-start items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="answers"
                        id={elem}
                        onChange={(e) => {
                          console.log(e.currentTarget.parentNode.id);
                          let myAnswers = [...userAnswers];
                          myAnswers[curQuestion] =
                            e.currentTarget.parentNode.id;
                          setUserAnswers(myAnswers);
                        }}
                      />{" "}
                      <label htmlFor={elem}>{elem}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              icon={<FaChevronRight className="text-6xl" />}
              style={"transparent"}
              onClick={() => {
                navigateQuestion(+1);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
