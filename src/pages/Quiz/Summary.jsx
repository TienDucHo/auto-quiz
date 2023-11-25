import { NavBar } from "../../components/NavBar";
import { Button } from "../../components/Button";
import { FaPlus, FaChevronLeft } from "react-icons/fa6";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router-dom";
import { bool, string, number, arrayOf, object } from "prop-types";
import { twMerge } from "tailwind-merge";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../auth/Config";
import { useState } from "react";

const auth = getAuth();

AttemptRow.propTypes = {
  isHeader: bool,
  index: number,
  attemptName: string,
  attemptScore: string,
  attemptNumQuestions: number,
  quizId: string,
  id: string,
};

function AttemptRow({
  isHeader,
  index,
  attemptScore,
  attemptNumQuestions,
  quizId,
  id,
}) {
  const navigate = useNavigate();
  const rowVariants = {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.ul
      className={twMerge(
        "flex justify-between items-center rounded-2xl px-6 py-4",
        isHeader
          ? "border-secondary border-[1px]"
          : index % 2 === 0
            ? "bg-primary text-secondary"
            : "bg-secondary text-primary",
        !isHeader && "hover:brightness-125 active:brightness-75"
      )}
      onClick={() => {
        navigate(`/quiz/${quizId}/attempt/${id}`);
      }}
      variants={rowVariants}
    >
      <li className="w-20 text-left">
        {isHeader ? "Attempt" : `Attempt ${index}`}
      </li>
      <li className="w-20 text-center">
        {isHeader ? "Score" : attemptScore}
      </li>
      <li className="w-20 text-right">
        {isHeader ? "Questions" : attemptNumQuestions}
      </li>
    </motion.ul>
  );
}

AttemptTable.propTypes = {
  attempts: arrayOf(object),
};

function AttemptTable({ attempts }) {
  const tableVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col gap-4"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <AttemptRow isHeader={true} />

        {attempts.map((elem, id) => {
          return (
            <AttemptRow
              key={id}
              index={id}
              {...elem}
              attemptNumQuestions={elem.questions.length}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Summary() {
  const { id, name } = useLoaderData();
  const [user, loading] = useAuthState(auth);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!id) navigate("/");
    if (!user) {
      console.log("Haiz");
      navigate("/");
    } else {
      const getAttempts = async (user) => {
        const newAttemptList = [];
        const q = query(
          collection(
            db,
            "users",
            user.uid,
            "quizSets",
            id,
            "attempts"
          )
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const newAttempt = {
            id: doc.id,
            ...doc.data(),
            quizId: id,
          };
          newAttemptList.push(newAttempt);
        });
        setAttempts(newAttemptList);
      };
      getAttempts(user);
    }
  }, [id, user, loading, navigate]);

  return (
    <div className="py-4 px-12 min-h-[100dvh] bg-black text-white flex flex-col gap-12">
      {/* Nav Bar */}
      <NavBar />
      {/* Header */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex gap-4 items-center">
          <Button
            icon={<FaChevronLeft />}
            style={"transparent"}
            onClick={() => {
              navigate("/dashboard");
            }}
          />
          <h2 className="text-3xl font-bold text-secondary">
            {name}
          </h2>
        </div>
        <Button
          text={"New Attempt"}
          icon={<FaPlus />}
          style={"secondary"}
          onClick={() => {
            navigate(`/quiz/${id}/attempt-create`);
          }}
        />
      </motion.div>
      {/* Attempt Table */}
      <AttemptTable attempts={attempts} />
    </div>
  );
}
