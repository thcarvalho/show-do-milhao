import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import AlternativesForm from '../AlternativesForm';
import Button from '../Button';
import { Widget } from '../Widget';

function QuestionWidget({
  totalQuestions, question, questionIndex, onSubmit, addResult, setEndGame,
}) {
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const questionId = `question__${questionIndex}`;
  const hasAlternativeSelected = selectedValue !== undefined;
  const controls = useAnimation();

  useEffect(() => {
    controls.start('show');
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (question.answer === selectedValue) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setEndGame(true);
    }
  }

  function handleNextQuestion(e) {
    e.preventDefault();
    addResult(isCorrect);
    setSelectedValue(undefined);
    setIsCorrect(null);
    setIsFormSubmitted(false);
    onSubmit();
    controls.start('hidden').then(() => controls.start('show'));
  }

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img alt="Descrição" style={{ width: '100%', height: '150px', objectFit: 'cover' }} src={question.image} />
      <Widget.Content
        as={motion.div}
        transition={{ duration: 0.4, type: 'spring' }}
        variants={{
          show: { x: 0, opacity: 1 },
          hidden: { x: -500, opacity: 0 },
        }}
        animate={controls}
      >
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm onSubmit={isFormSubmitted ? handleNextQuestion : handleSubmit}>
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedValue === index;
            return (
              <Widget.Topic
                key={alternativeId}
                as={motion.label}
                transition={{ duration: 0.3, type: 'spring', delay: (index / 10) }}
                variants={{
                  show: { y: 0, opacity: 1 },
                  hidden: { y: 10, opacity: 0 },
                }}
                initial="hidden"
                animate={controls}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isFormSubmitted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedValue(index)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          {isFormSubmitted ? (
            <div>
              <Button type="submit">Próxima pergunta</Button>
              <p>{isCorrect === true ? 'Certa Resposta!' : 'Que pena! Você errou!'}</p>
            </div>
          ) : (
            <Button type="submit" disabled={!hasAlternativeSelected}>{hasAlternativeSelected ? 'Você está certo disso?' : 'Escolha uma alternativa'}</Button>
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

export default QuestionWidget;
