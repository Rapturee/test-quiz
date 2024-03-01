// QuizForm.js
import { useState, useEffect } from 'react';
import styles from '../styles/Admin.module.css';

const QuizForm = ({ initialQuestion, onSubmit, onCancel }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion.title);
      const initialAnswers = initialQuestion.answers.map(a => a.text);
      setAnswers(initialAnswers);
    }
  }, [initialQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    // Check if all inputs are filled
    if (!question.trim() || answers.some(answer => !answer.trim())) {
      setValidationError("Hey, you missed some input, please check your question and answers!");
      return;
    }

    const formattedAnswers = answers.map((text, index) => ({
      id: index + 1,
      text,
      correct: index === 0 // Assuming the first answer is always correct
    }));

    onSubmit({
      id: initialQuestion ? initialQuestion.id : Date.now(),
      title: question,
      answers: formattedAnswers
    });
    setQuestion('');
    setAnswers(['', '', '', '']);
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  return (
    <form onSubmit={handleSubmit}>
      {validationError && <p className={styles.errorMessage}>{validationError}</p>}
      <label>
        Question:
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className={styles.inputField}
        />
      </label>
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={e => handleAnswerChange(index, e.target.value)}
            className={styles.inputField}
          />
        </label>
      ))}
      <button className={styles.saveButton} type="submit">Save</button>
      {onCancel && <button className={styles.cancelButton} type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default QuizForm;