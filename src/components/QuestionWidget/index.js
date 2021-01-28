import React from 'react';
import Button from '../Button';
import { Widget } from '../Widget';

function QuestionWidget({
  totalQuestions, question, questionIndex, onSubmit,
}) {
  const questionId = `question__${questionIndex}`;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img alt="Descrição" style={{ width: '100%', height: '150px', objectFit: 'cover' }} src={question.image} />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <form onSubmit={handleSubmit}>
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId}>
                <input id={alternativeId} name={questionId} type="radio" />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">Confirmar</Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

export default QuestionWidget;
