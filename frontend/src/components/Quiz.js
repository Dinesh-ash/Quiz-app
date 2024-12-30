import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30); // Timer set to 30 seconds for each question
    const [timerActive, setTimerActive] = useState(true); // Whether the timer is running

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/quiz');
                setQuestions(res.data);
            } catch (err) {
                console.error('Error fetching questions:', err);
            }
        };
        fetchQuestions();
    }, []);

    // Start the timer when the component is loaded
    useEffect(() => {
        if (timerActive && timer > 0) {
            const timerId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            // Clear the timer when the component is unmounted or the timer expires
            return () => clearInterval(timerId);
        }

        // When timer reaches 0, go to next question
        if (timer === 0) {
            handleNextQuestion();
        }
    }, [timer, timerActive]);

    // Handle answering a question
    const handleAnswer = (isCorrect) => {
        if (isCorrect) setScore(score + 1);
        handleNextQuestion();
    };

    // Move to the next question
    const handleNextQuestion = () => {
        setTimer(30);  // Reset the timer for the next question
        setCurrentQuestion(currentQuestion + 1);
        setTimerActive(true); // Restart the timer
    };

    if (!questions.length) return <p>Loading questions...</p>;

    if (currentQuestion >= questions.length) {
        return (
            <div className="quiz-container">
                <h2 className="quiz-header">Quiz Completed!</h2>
                <p className="quiz-score">Your score: {score}/{questions.length}</p>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="quiz-header-container">
                <p className="timer">Time Left: {timer}s</p>
            </div>
            <h2 className="quiz-question">{questions[currentQuestion].question}</h2>
            <div className="quiz-options">
                {questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        className="quiz-option"
                        onClick={() => handleAnswer(index === questions[currentQuestion].correctOption)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
