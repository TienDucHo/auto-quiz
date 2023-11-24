//#region imports
import PropTypes from 'prop-types';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
//#endregion

const auth = getAuth()

const QuestionPage = ({ list, question, questionIndex }) => {
    const answersList = list
    const questionNum = questionIndex
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading, navigate])

    return <div className="flex w-full h-full justify-center flex-col gap-y-8 bg-primary px-8 py-16 rounded-2xl">
        <div className="flex flex-col gap-y-2">
            <p className="text-xl lg:text-2xl text-secondary">Q{questionNum + 1}</p>
            <p className="text-xl lg:text-2xl">{question}</p>
        </div>
        <div className="flex flex-col gap-y-4 lg:gap-y-6 text-lg">
            {answersList.map((answer, index) => {
                return <div key={index} className="flex gap-x-4 items-center" name="form">
                    <input className="w-6 h-6 rounded-2xl cursor-pointer bg-white appearance-none checked:bg-accent" type="radio" id={answer} name={questionNum} value={answer} />
                    <label htmlFor="child">{answer}</label>
                </div>
            })}
        </div>

    </div>
}

QuestionPage.propTypes = {
    list: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired,
    questionIndex: PropTypes.number.isRequired
};

export default QuestionPage;