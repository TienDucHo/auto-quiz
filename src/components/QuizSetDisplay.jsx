//#region imports
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../auth/Config";
import { doc, deleteDoc, updateDoc } from "@firebase/firestore";
//#endregion

const auth = getAuth();

/**
 * Component for displaying a quiz set.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.quizName - The name of the quiz set.
 * @param {string} props.id - The id of the quiz set.
 * @param {func} props.setQuizSets - The function to update the quiz set list
 * @param {number} props.index - The index in side the quiz set list
 * @param {array} props.quizSets - The parent's quiz set list
 * @returns {JSX.Element} The rendered component.
 */
const QuizSetDisplay = ({
  quizName,
  id,
  index,
  quizSets,
  setQuizSets,
}) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [isActive, setIsActive] = useState(false);
  const [renameWanted, setRenameWanted] = useState(false);
  const [newName, setNewName] = useState("");

  const handleRename = (e) => {
    e.stopPropagation();
    // update UI
    const thisQuizSet = { ...quizSets[index], name: newName };
    const newQuizSets = [...quizSets];
    newQuizSets[index] = thisQuizSet;
    setQuizSets(newQuizSets);

    // update DB
    const renameQuiz = async (user) => {
      await updateDoc(doc(db, "users", user.uid, "quizSets", id), {
        name: newName,
      });
    };

    renameQuiz(user);
    setRenameWanted(false);
    setIsActive(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const deleteQuiz = async (user) => {
      await deleteDoc(doc(db, "users", user.uid, "quizSets", id));
    };
    deleteQuiz(user);
    quizSets.splice(index, 1);
    setQuizSets([...quizSets]);
    setIsActive(false);
  };

  return (
    <div
      onClick={() => {
        navigate(`/quiz/${quizName}`);
      }}
      className={`min-h-[16rem] rounded-2xl text-white font-bold text-lg lg:text-xl w-full flex items-center justify-center bg-primary transition  ease-in-out duration-300 relative cursor-pointer ${
        !isActive ? "hover:bg-secondary hover:text-black" : ""
      }`}
    >
      <button
        className="absolute right-8 top-8 text-2xl lg:text-3xl z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsActive(!isActive);
          setRenameWanted(false);
        }}
      >
        {isActive ? <IoClose /> : <HiOutlineDotsHorizontal />}
      </button>
      {isActive ? (
        <div
          className={`w-full h-full bg-black opacity-70 absolute top-0 left-0 gap-y-2 font-medium flex flex-col items-start pl-[38%] justify-center hover:text-accent2 ${
            renameWanted && "hidden"
          }`}
        >
          <button
            className="flex gap-x-2 items-center text-white hover:text-accent2"
            onClick={(e) => {
              e.stopPropagation();
              setRenameWanted(true);
            }}
          >
            <FaEdit /> Rename
          </button>
          <button
            className="flex gap-x-2 items-center text-white hover:text-accent1"
            onClick={handleDelete}
          >
            <FaTrash /> Delete
          </button>
        </div>
      ) : (
        <span>{quizName}</span>
      )}

      {isActive && renameWanted && (
        <div className="w-full cursor-default h-full bg-black opacity-70 absolute top-0 left-0 flex flex-col gap-y-4 items-center justify-center">
          <input
            maxLength={20}
            type="text"
            placeholder={quizName}
            onClick={(e) => {
              e.stopPropagation();
            }}
            value={newName}
            onChange={(e) => {
              setNewName(e.currentTarget.value);
            }}
            className="outline-none text-black font-normal px-4 py-2 rounded-2xl"
          />
          <button
            className="hover:text-accent2"
            onClick={handleRename}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

QuizSetDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  quizName: PropTypes.string.isRequired,
  setQuizSets: PropTypes.func.isRequired,
  quizSets: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default QuizSetDisplay;
