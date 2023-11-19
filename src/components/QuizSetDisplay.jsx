//#region imports
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import PropTypes from "prop-types";
//#endregion

const QuizSetDisplay = ({ quizName }) => {
    const [isActive, setIsActive] = useState(false);

    return <div className="min-h-[16rem] rounded-2xl text-white font-bold text-lg lg:text-xl w-full flex items-center justify-center bg-primary hover:bg-secondary hover:text-black transition  ease-in-out duration-300 relative cursor-pointer" onClick={() => setIsActive(!isActive)}>
        <button className="absolute right-8 top-8 text-2xl lg:text-3xl">
            {isActive ? <IoClose /> : <HiOutlineDotsHorizontal />}
        </button>
        {quizName}
    </div>
}

QuizSetDisplay.propTypes = {
    quizName: PropTypes.string.isRequired
};

export default QuizSetDisplay;