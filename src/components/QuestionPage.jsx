//#region imports
import PropTypes from 'prop-types';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
//#endregion

const auth = getAuth()

const QuestionPage = ({ list, question, questionIndex, userAnswers, modifiable, rightAnswer }) => {
    const answersList = list
    const questionNum = questionIndex
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth)
    console.log(userAnswers)
    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading, navigate])

    return <div className="flex w-full h-full justify-center flex-col gap-y-8 bg-primary px-6 md:px-8 py-16 rounded-2xl">
        <div className="flex flex-col gap-y-2">
            <p className="text-lg sm:text-xl lg:text-2xl text-secondary font-bold">Q{questionNum + 1}</p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{question}</p>
        </div>
        <div className="flex flex-col gap-y-4 lg:gap-y-6 md:text-lg">
            {answersList.map((answer, index) => {
                return <div key={index} className="flex gap-x-4 items-center" name="form">
                    <input className="w-5 h-5 md:w-8 md:h-8 rounded-full cursor-pointer bg-white appearance-none checked:bg-accent" type="radio" id={answer} name={questionNum} value={answer} defaultChecked={userAnswers != null && userAnswers[questionIndex] === answer} onClick={(e) => e.target.checked = true}
                        disabled={!modifiable} />
                    <label htmlFor={answer}>{answer}</label>
                    {!modifiable && <p>{answer === rightAnswer ? <FaCheck className="text-accent2 text-xl md:text-2xl" /> : <IoClose className="text-accent1 text-2xl md:text-3xl" />}</p>}
                </div>
            })}
        </div>

    </div>
}

QuestionPage.propTypes = {
    list: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired,
    questionIndex: PropTypes.number.isRequired,
    userAnswers: PropTypes.array,
    rightAnswer: PropTypes.string.isRequired,
    modifiable: PropTypes.bool
};

export default QuestionPage;