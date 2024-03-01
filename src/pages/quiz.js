// pages/quiz.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getQuestionsFromLocalStorage } from '../utils/localStorageUtils';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [userName, setUserName] = useState(''); // Add state for userName
  const [score, setScore] = useState(0); // Add state for score

  useEffect(() => {
    // Fetch questions from localStorage
    const storedQuestions = getQuestionsFromLocalStorage();
    setQuestions(storedQuestions);

    // TODO: Implement logic to get user's name
    // For now, we'll use a placeholder name
    setUserName('User1');
  }, []);

  // TODO: Implement your quiz logic here
  // This function should be called when the quiz is completed
  const handleQuizCompletion = () => {
    saveUserScore(userName, score);

    // Additional actions on quiz completion, if needed
  };

  return (
    <div>
      <Navbar />
      <h1>Quiz Page</h1>
      {/* Render questions here */}
      {questions.map(question => (
        <div key={question.id}>
          <h2>{question.title}</h2>
          {/* TODO: Render answers and implement answer handling logic */}
        </div>
      ))}

      {/* Placeholder button to simulate quiz completion */}
      <button onClick={handleQuizCompletion}>Finish Quiz</button>
    </div>
  );
};

export default QuizPage;