//#region imports
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../auth/Config";
//#endregion

//#region components
import { NavBar } from "../components/NavBar";
import QuizSetDisplay from "../components/QuizSetDisplay";
import { Button } from "../components/Button";
//#endregion

const auth = getAuth();

/**
 * Dashboard page component.
 * @returns {JSX.Element} Dashboard page JSX element.
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [quizSets, setQuizSets] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    else {
      const getQuizSets = async (user) => {
        const newQuizSetList = [];
        const q = query(
          collection(db, "users", user.uid, "quizSets")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const newQuizSet = { id: doc.id, ...doc.data() };
          newQuizSetList.push(newQuizSet);
        });
        setQuizSets(newQuizSetList);
      };
      getQuizSets(user);
    }
  }, [user, loading, navigate]);

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

  const childVariants = {
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
    !loading && (
      <div className="bg-black p-12 flex flex-col gap-y-12 md:gap-y-16">
        <NavBar />
        <div className="text-secondary font-bold flex justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              to="/dashboard"
              className="text-3xl lg:text-4xl hover:text-accent transition ease-in-out"
            >
              Dashboard
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Button
              style="secondary"
              text="Add"
              icon={<IoAddOutline className="font-black text-2xl" />}
              onClick={() => {
                navigate("/quiz-create");
              }}
            />
          </motion.div>
        </div>
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {quizSets.map(({ name, id }, index) => {
            return (
              <motion.div key={id} variants={childVariants}>
                <QuizSetDisplay
                  quizName={name}
                  id={id}
                  index={index}
                  quizSets={quizSets}
                  setQuizSets={setQuizSets}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    )
  );
};

export default Dashboard;
