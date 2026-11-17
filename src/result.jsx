import "./result.css";

function Result({ questions, answers, score, onRestart }) {

    const totalQuestions = questions.length;
    const incorrectAnswers = totalQuestions - score;
    const percentage = (score / totalQuestions) * 100;

    return (
        <div className="result-container">

            <h1>QUIZ RESULT</h1>

            <div className="score-box">
                <h2>Your Score</h2>
                <h1>{score}/{totalQuestions}</h1>
                <p>{percentage.toFixed(2)}% Score</p>
            </div>

            <div className="result-summary">
                <div className="summary-card correct-box">
                    <h3>{score}</h3>
                    <p>Correct Answers</p>
                </div>

                <div className="summary-card incorrect-box">
                    <h3>{incorrectAnswers}</h3>
                    <p>Incorrect Answers</p>
                </div>
            </div>

            <h2 className="review-title">Answer Review</h2>

            {questions.map((question, index) => {

                const userAnswer = answers[index];

                const status = !userAnswer
                    ? "Not Attempted"
                    : userAnswer === question.answer
                        ? "Correct"
                        : "Incorrect";

                return (
                    <div className="review-card" key={index}>

                        <h3>
                            Q{index + 1}. {question.question}
                        </h3>

                        <p>
                            Your Answer: {userAnswer || "Not Attempted"}
                        </p>

                        <p>
                            Correct Answer: {question.answer}
                        </p>

                        <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>
                            {status}
                        </span>

                    </div>
                );
            })}

            <button className="restart-btn" onClick={onRestart}>
                Restart Quiz
            </button>

        </div>
    );
}

export default Result;
