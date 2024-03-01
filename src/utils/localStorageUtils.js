// utils/localStorageUtils.js

export const saveQuestionsToLocalStorage = (questions) => {
    localStorage.setItem('questions', JSON.stringify(questions));
  };
  
  export const getQuestionsFromLocalStorage = () => {
    const storedQuestions = localStorage.getItem('questions');
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  };
  
  export const saveUserScore = (userName, score) => {
    const userScore = { userName, score };
    localStorage.setItem('userScore', JSON.stringify(userScore));
  };
  
  export const getUserScore = () => {
    const storedUserScore = localStorage.getItem('userScore');
    return storedUserScore ? JSON.parse(storedUserScore) : null;
  };