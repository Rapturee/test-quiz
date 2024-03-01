// admin.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import QuizForm from '../components/QuizForm';
import styles from '../styles/Admin.module.css'; // Import the CSS module
import { saveQuestionsToLocalStorage, getQuestionsFromLocalStorage, deleteQuestion, updateQuestion } from '../utils/localStorageUtils';

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    // Fetch questions from localStorage instead of getQuestions()
    const storedQuestions = getQuestionsFromLocalStorage();
    setQuestions(storedQuestions);
  }, []);

  const handleAddQuestion = (newQuestion) => {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    saveQuestionsToLocalStorage(updatedQuestions); // Save to localStorage
    setShowForm(false);
  };

  const handleRemoveQuestion = (id) => {
    const updatedQuestions = questions.filter(question => question.id !== id);
    setQuestions(updatedQuestions);
    saveQuestionsToLocalStorage(updatedQuestions); // Save to localStorage
  };

  const handleEditQuestion = (editedQuestion) => {
    const updatedQuestions = questions.map(question => 
      question.id === currentQuestion.id ? editedQuestion : question
    );
    setQuestions(updatedQuestions);
    saveQuestionsToLocalStorage(updatedQuestions); // Save to localStorage
    setCurrentQuestion(questionToEdit);
    setShowForm(true);
  };

  const handleCancel = () => {
    setCurrentQuestion(null);
    setShowForm(false);
  };

  return (
    <div className={styles.adminContainer}>
      <Navbar />
      <h1 className={styles.adminHeader}>Admin Page</h1>

      <div className={styles.buttonsContainer}>
        {!showForm && (
          <button className={styles.buttonBox} onClick={() => setShowForm(true)}>
            Add Question
          </button>
        )}
      </div>

      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.title}</p>
          <div className={styles.buttonsContainer}>
            <button className={styles.buttonBox} onClick={() => handleRemoveQuestion(question.id)}>
              Remove Question
            </button>
            <button className={styles.buttonBox} onClick={() => {
              setShowForm(true);
              setCurrentQuestion(question);
            }}>
              Edit Question
            </button>
          </div>
        </div>
      ))}

      {showForm && (
        <div className={styles.formContainer}>
          <QuizForm
            onSubmit={currentQuestion ? handleEditQuestion : handleAddQuestion}
            onCancel={handleCancel}
            question={currentQuestion}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPage;