//#region imports
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";
//#endregion

/**
 * Component for displaying a quiz set.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.quizName - The name of the quiz set.
 * @returns {JSX.Element} The rendered component.
 */
const QuizSetDisplay = ({ quizName }) => {
    const [isActive, setIsActive] = useState(false);
    const [renameWanted, setRenameWanted] = useState(false);

    return <div className={`min-h-[16rem] rounded-2xl text-white font-bold text-lg lg:text-xl w-full flex items-center justify-center bg-primary transition  ease-in-out duration-300 relative cursor-pointer ${!isActive ? "hover:bg-secondary hover:text-black" : ""}`}>
        <button className="absolute right-8 top-8 text-2xl lg:text-3xl z-10" onClick={() => {
            setIsActive(!isActive)
            setRenameWanted(false)
        }}>
            {isActive ? <IoClose /> : <HiOutlineDotsHorizontal />}
        </button>
        {isActive ? <div className={`w-full h-full bg-black opacity-70 absolute top-0 left-0 gap-y-2 font-medium flex flex-col items-start pl-[38%] justify-center hover:text-accent2 ${renameWanted && "hidden"}`}>
            <button className="flex gap-x-2 items-center text-white hover:text-accent2"
                onClick={() => setRenameWanted(true)}>
                <FaEdit /> Rename
            </button>
            <button className="flex gap-x-2 items-center text-white hover:text-accent1" onClick={() => { alert("Delete in Firebase") }}>
                <FaTrash /> Delete
            </button>
        </div> : <>{quizName}</>}

        {isActive && renameWanted && <div className="w-full cursor-default h-full bg-black opacity-70 absolute top-0 left-0 flex flex-col gap-y-4 items-center justify-center">
            <input maxLength={20} type="text" placeholder={quizName} className="outline-none text-black font-normal px-4 py-2 rounded-2xl" />
            <button className="hover:text-accent2" onClick={() => {
                alert("Push to Firebase")
                setRenameWanted(false)
            }}>Save</button>
        </div>}
    </div>
}

QuizSetDisplay.propTypes = {
    quizName: PropTypes.string.isRequired
};

export default QuizSetDisplay;