import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './Quiz.css';

const CodeQuiz = () => {
    const [questions, setQuestions] = useState([]);  // Store the quiz questions
    const [currentQuestion, setCurrentQuestion] = useState(0);  // Track current question index
    const [score, setScore] = useState(0);  // Track the score
    const [timer, setTimer] = useState(30);  // Timer for each question
    const [quizCompleted, setQuizCompleted] = useState(false);  // Track quiz completion
    const navigate = useNavigate(); // To navigate to other pages

    // Fetch quiz questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/quiz');  // Adjust your endpoint
                setQuestions(res.data);  // Store the questions
            } catch (err) {
                console.error('Error fetching questions:', err);
            }
        };
        fetchQuestions();
    }, []);

    // Timer logic for each question
    useEffect(() => {
        if (timer <= 0) {
            handleNextQuestion();  // Move to the next question when timer hits 0
        } else {
            const timerId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(timerId);  // Cleanup timer when component unmounts
        }
    }, [timer]);

    // Handle user answer selection
    const handleAnswer = (isCorrect) => {
        if (isCorrect) setScore(score + 1);  // Increment score if answer is correct
        handleNextQuestion();  // Move to the next question
    };

    // Move to the next question
    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setTimer(30);  // Reset timer for the next question
            setCurrentQuestion(currentQuestion + 1);  // Go to the next question
        } else {
            setQuizCompleted(true);  // Set quiz as completed when all questions are answered
        }
    };

    // Display the results and "Back to Home" button
    const renderQuizCompletion = () => (
        <div className="quiz-completion">
            <h2 className="quiz-header">Quiz Completed!</h2>
            <p className="quiz-score">Your score: {score}/{questions.length}</p>
            <button
                className="back-home-btn"
                onClick={() => navigate('/')}  // Navigate back to the home page
            >
                Back to Home
            </button>
        </div>
    );

    // Show loading message if questions are not yet fetched
    if (!questions.length) return <p>Loading questions...</p>;

    // Display questions if quiz is not completed yet
    return (
        <div className="quiz-container">
            <div className="quiz-header-container">
                <p className="timer">Time Left: {timer}s</p>
            </div>

            {quizCompleted ? (
                renderQuizCompletion()  // Render the completion screen
            ) : (
                <>
                    <h2 className="quiz-question">
                        Question {currentQuestion + 1}: {questions[currentQuestion].question}
                    </h2>
                    <div className="quiz-options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className="quiz-option"
                                onClick={() => handleAnswer(index === questions[currentQuestion].correctOption)}  // Check if answer is correct
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CodeQuiz;
