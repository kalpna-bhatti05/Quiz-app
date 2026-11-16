
import { useState, useEffect } from "react";
import "./quiz.css";

function Quiz() {

    const [startQuiz, setStartQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(200);

    const questions = [
        {
            question: "What is React?",
            options: [
                "JavaScript Library",
                "Programming Language",
                "Database",
                "Operating System"
            ],
            answer: "JavaScript Library"
        },
        {
            question: "Who developed React?",
            options: [
                "Google",
                "Facebook",
                "Microsoft",
                "Amazon"
            ],
            answer: "Facebook"
        },
        {
            question: "Which hook is used to manage state?",
            options: [
                "useEffect",
                "useState",
                "useRef",
                "useMemo"
            ],
            answer: "useState"
        },
        {
            question: "What is JSX?",
            options: [
                "JavaScript XML",
                "Java Syntax",
                "JSON XML",
                "None of these"
            ],
            answer: "JavaScript XML"
        },
        {
            question: "Which method is used to render lists in React?",
            options: [
                "filter()",
                "map()",
                "reduce()",
                "find()"
            ],
            answer: "map()"
        }
    ];

    function nextQuestion() {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1] || null);
    }

    function previousQuestion() {
        setCurrentQuestion(currentQuestion - 1);
        setSelectedAnswer(answers[currentQuestion - 1] || null);
    }

    function calculateScore() {
        let totalScore = 0;

        questions.forEach((question, index) => {
            if (answers[index] === question.answer) {
                totalScore++;
            }
        });

        setScore(totalScore);
        setShowResult(true);
    }

    function restartQuiz() {
        setStartQuiz(false);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
        setAnswers({});
        setTimeLeft(200);
    }

    useEffect(() => {

        if (!startQuiz || showResult) return;

        if (timeLeft === 0) {
            calculateScore();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [timeLeft, showResult, startQuiz]);

    if (!startQuiz) {
        return (
            <div className="quiz-container">

                <h1>QUIZ INSTRUCTIONS</h1>

                <h3>Please read the instructions carefully:</h3>

                <ul>
                    <li>This quiz contains 5 questions.</li>
                    <li>Each question has 4 options.</li>
                    <li>Select only one correct answer.</li>
                    <li>You can use Next and Previous buttons.</li>
                    <li>Total time is 3 minutes 20 seconds.</li>
                    <li>Submit your quiz before the time ends.</li>
                    <li>When time is over, quiz will submit automatically.</li>
                </ul>

                <button onClick={() => setStartQuiz(true)}>
                    Start Quiz
                </button>

            </div>
        );
    }

    if (showResult) {
        const incorrectAnswers = questions.length - score;
        const percentage = (score / questions.length) * 100;

        return (
            <div className="quiz-container">

                <h1>QUIZ RESULT</h1>

                <h2>Your Score: {score} / {questions.length}</h2>

                <p>Total Questions: {questions.length}</p>

                <p>Correct Answers: {score}</p>

                <p>Incorrect Answers: {incorrectAnswers}</p>

                <p>Percentage: {percentage}%</p>

                <button onClick={restartQuiz}>
                    Restart Quiz
                </button>

            </div>
        );
    }

    return (
        <div className="quiz-container">

            <h1>QUIZ APP</h1>

            <p>
                Question {currentQuestion + 1} of {questions.length}
            </p>

            <h3>
                Time Left: {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
            </h3>

            <h2>{questions[currentQuestion].question}</h2>

            {questions[currentQuestion].options.map((option, index) => (
                <button
                    key={index}
                    className={selectedAnswer === option ? "selected" : "option"}
                    onClick={() => {
                        setSelectedAnswer(option);
                        setAnswers({
                            ...answers,
                            [currentQuestion]: option
                        });
                    }}
                >
                    {option}
                </button>
            ))}

            
<div className="navigation">

    <button
        onClick={previousQuestion}
        disabled={currentQuestion === 0}
    >
        Previous
    </button>

    {currentQuestion === questions.length - 1 ? (
        <button
            onClick={calculateScore}
           disabled={currentQuestion === 0}
        >
            Submit Quiz
        </button>
    ) : (
        <button onClick={nextQuestion}>
            Next
        </button>
    )}

</div>


        </div>
    );
}

export default Quiz;
