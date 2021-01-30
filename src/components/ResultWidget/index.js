import { useRouter } from 'next/router';
import Link from 'next/link';

import React from 'react';
import { Widget } from '../Widget';

const reward = [0, 1, 2, 5, 10, 25, 50, 100, 200, 500, 1];

function ResultWidget({ results }) {
  const points = results.filter((result) => result).length;
  const router = useRouter();
  return (
    <>
      <Widget>
        <Widget.Header>
          Resultado
        </Widget.Header>

        <Widget.Content>
          <p>
            {`Você acertou ${points} perguntas`}
          </p>
          <h2>
            {
              // eslint-disable-next-line no-nested-ternary
              points === 0
                ? `Que pena ${router.query.name}! Você volta pra casa sem nada!`
                : points === 10
                  ? `Parabéns ${router.query.name}! Você ganhou 1 milhão de reais!`
                  : `${router.query.name}, você leva pra casa ${reward[points]} mil reais!`
            }
          </h2>
          <ul>
            {results.map((result, index) => {
              const resultId = `result__${index}`;
              return (
                <li key={resultId}>
                  <Widget.Topic>
                    {`#${index + 1} Resultado: ${result === true ? 'Acertou' : 'Errou'}`}
                  </Widget.Topic>
                </li>
              );
            })}
          </ul>
          <Link href="/">
            <Widget.Link>
              <span>Voltar para home</span>
            </Widget.Link>
          </Link>
        </Widget.Content>
      </Widget>
    </>
  );
}

export default ResultWidget;
