import React from 'react';
import { Widget } from '../Widget';

function ResultWidget({ results }) {
  return (
    <>
      <Widget>
        <Widget.Header>
          Resultados
        </Widget.Header>

        <Widget.Content>
          <p>
            {`Você acertou ${results.filter((result) => result).length} perguntas`}
          </p>
          <ul>
            {results.map((result, index) => {
              const resultId = `result__${index}`;
              return (
                <li key={resultId}>
                  {`#${index + 1} Resultado: ${result === true ? 'Acertou' : 'Errou'}`}
                </li>
              );
            })}
          </ul>
        </Widget.Content>
      </Widget>
    </>
  );
}

export default ResultWidget;
