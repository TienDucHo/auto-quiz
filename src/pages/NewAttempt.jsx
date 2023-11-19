//#region imports
import { useLoaderData, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { db } from "../auth/Config";
import { collection, addDoc } from "@firebase/firestore";
import generateQuiz from "../utils/OpenAI";

dayjs.extend(customParseFormat);
//#endregion

//#region components
import { NavBar } from "../components/NavBar";
//#endregion

const auth = getAuth();

/**
 * New Attempt page component.
 * @returns {JSX.Element} New Attempt JSX element.
 */
const NewAttempt = () => {
  // TODO: PUSH NUMBER OF QUESTIONS AND TIMER TO FIREBASE
  const [numQuestions, setNumQuestions] = useState(10);
  const [time, setTime] = useState(0);
  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, loading] = useAuthState(auth);
  const { id, textContent } = useLoaderData();

  useEffect(() => {
    if (loading) return;
    if (!id) navigate("/");
  }, [id, navigate, loading]);

  const { name } = useLoaderData();
  const quizName = name;

  const handleQuestionsInput = (e) => {
    if (isNaN(e.target.value)) {
      setNumQuestions(false);
      setDisableSubmit(true);
    } else if (
      Number(e.target.value) > 0 &&
      Number(e.target.value) < 61
    ) {
      setNumQuestions(Number(e.target.value));
      setDisableSubmit(false);
    } else {
      setNumQuestions(false);
      setDisableSubmit(true);
    }
  };

  const handleTimeInput = (e) => {
    if (e.target.value === "") setTime(0);
    else if (dayjs(e.target.value, "HH:mm:ss").isValid())
      setTime(e.target.value);
    else setTime(false);
  };

  // animation effects
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.3,
      },
    },
  };

  const formVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1,
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
        duration: 1,
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const addNewAttempt = async () => {
      let generatedQuestions = await generateQuiz(
        numQuestions,
        textContent
      );
      let questionList = generatedQuestions.split("\n");
      const questionsJSONString = `[${questionList.join(",")}]`;
      try {
        const questions = JSON.parse(questionsJSONString);
        const docRef = await addDoc(
          collection(
            db,
            "users",
            user.uid,
            "quizSets",
            id,
            "attempts"
          ),
          {
            numQuestions: numQuestions,
            time: time,
            questions: questions,
          }
        );
        console.log("New attempt created");
        navigate(`/quiz/${id}/attempt/${docRef.id}`);
      } catch (e) {
        console.log(questionsJSONString);
        console.log(e);
      } finally {
        setSubmitting(false);
      }
    };

    addNewAttempt();
  };

  return (
    !loading && (
      <div className="h-screen p-12 flex flex-col">
        <NavBar />
        <div className="grid lg:grid-cols-2 w-full h-full place-items-center gap-y-16">
          <motion.div
            className="flex flex-col gap-y-4 self-end lg:self-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="text-accent font-medium texy-xl lg:text-2xl"
              variants={childVariants}
            >
              {quizName}
            </motion.p>
            <motion.p
              className="text-secondary font-medium text-4xl lg:text-5xl"
              variants={childVariants}
            >
              New Attempt
            </motion.p>
            <motion.p
              className="text-white opacity-70 text-xl lg:text-2xl"
              variants={childVariants}
            >
              Why settle for anything less than an actual quiz to
              evaluate your understanding?
            </motion.p>
          </motion.div>
          <motion.form
            className="text-secondary lg:pl-[20%] w-full flex flex-col gap-y-8 self-start lg:self-center items-center self-justify-end text-lg lg:text-xl"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.input
              type="text"
              placeholder="Number of Questions (default 10, max 60)"
              className={`bg-black w-full outline-none border-2 border-dotted px-8 py-3 rounded-2xl  ${
                numQuestions != false
                  ? "text-secondary border-secondary"
                  : "text-accent1 border-accent1 placeholder-accent1"
              }`}
              onChange={handleQuestionsInput}
              variants={childVariants}
            />

            <motion.div
              className="flex flex-col w-full gap-y-2"
              variants={childVariants}
            >
              <input
                type="text"
                maxLength={8}
                step="1"
                placeholder="hh:mm:ss (Optional)"
                className={`bg-black w-full text-secondary outline-none border-2 border-dotted px-8 py-3 rounded-2xl ${
                  time != false || time === 0
                    ? "border-secondary"
                    : "border-accent1 text-accent1 placeholder:bg-accent1"
                }`}
                onChange={handleTimeInput}
              />
              <p
                className={`font-medium text-accent1 text-base lg:text-lg ${
                  (time != false || time === 0) &&
                  numQuestions != false
                    ? "opacity-0"
                    : ""
                }`}
              >
                Invalid input
              </p>
            </motion.div>

            <motion.div
              className="flex justify-between w-full gap-x-6 md:gap-x-8"
              variants={childVariants}
            >
              <Button
                text="Cancel"
                className="w-full rounded-2xl border border-secondary py-3 px-8 hover:bg-primary hover:text-white hover:border-primary"
                style={"transparent"}
                type=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              />
              <Button
                text={submitting ? "Submitting..." : "Submit"}
                className={"w-full"}
                onClick={handleSubmit}
                disable={disableSubmit || submitting}
              />
              {/* <button className="w-full rounded-2xl border border-secondary py-3 px-8 hover:bg-primary hover:text-white hover:border-primary">Cancel</button>
                    <button className="w-full rounded-2xl bg-secondary text-black py-3 px-8 hover:bg-primary hover:text-white hover:border-accent">Create</button> */}
            </motion.div>
          </motion.form>
        </div>
      </div>
    )
  );
};

export default NewAttempt;
