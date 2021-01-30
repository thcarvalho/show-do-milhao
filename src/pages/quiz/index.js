import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import db from '../../../db.json';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import QuestionWidget from '../../components/QuestionWidget';
import LoadingWidget from '../../components/LoadingWidget';
import ResultWidget from '../../components/ResultWidget';
import Silvio from '../../components/Silvio';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [endgame, setEndgame] = useState(false);
  const totalQuestions = db.questions.length;

  useEffect(() => {
    setScreenState(screenStates.QUIZ);
  }, []);

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion === totalQuestions || endgame) {
      setScreenState(screenStates.RESULT);
    } else {
      setQuestionIndex(nextQuestion);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={db.questions[questionIndex]}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResult={addResult}
            setEndGame={setEndgame}
          />
        )}
        {screenState === screenStates.LOADING && (
          <LoadingWidget />
        )}
        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}

        <Silvio
          alt="Silvão"
          src="/silvao.png"
        />

      </QuizContainer>
    </QuizBackground>
  );
}
