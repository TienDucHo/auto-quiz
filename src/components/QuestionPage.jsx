//#region imports
import PropTypes from 'prop-types';
//#endregion

const QuestionPage = ({ list, question, questionIndex }) => {
    const answersList = list
    const questionNum = questionIndex

    const selectedRadio = () => {
        var selValue = document.querySelector(`input[name="${questionNum}"]:checked`);
        if (selValue != null) {
            console.log(selValue.value);
        }
    }

    selectedRadio()

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