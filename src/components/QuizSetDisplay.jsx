//#region imports
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";
//#endregion

const QuizSetDisplay = ({ quizName }) => {
    const [isActive, setIsActive] = useState(false);

    return <div className={`min-h-[16rem] rounded-2xl text-white font-bold text-lg lg:text-xl w-full flex items-center justify-center bg-primary transition  ease-in-out duration-300 relative cursor-pointer ${!isActive ? "hover:bg-secondary hover:text-black" : ""}`}>
        <button className="absolute right-8 top-8 text-2xl lg:text-3xl z-10" onClick={() => setIsActive(!isActive)}>
            {isActive ? <IoClose /> : <HiOutlineDotsHorizontal />}
        </button>
        {isActive ? <div className="w-full h-full bg-black opacity-70 absolute top-0 left-0 gap-y-2 font-medium flex flex-col items-start pl-[38%] justify-center hover:text-accent2">
            <button className="flex gap-x-2 items-center text-white hover:text-accent2">
                <FaEdit /> Rename
            </button>
            <button className="flex gap-x-2 items-center text-white hover:text-accent1">
                <FaTrash /> Delete
            </button>
        </div> : <>{quizName}</>}
    </div>
}

QuizSetDisplay.propTypes = {
    quizName: PropTypes.string.isRequired
};

export default QuizSetDisplay;