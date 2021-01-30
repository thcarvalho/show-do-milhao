import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../screens/Quiz';

function QuizDaGalera({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen db={externalDb} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const externalDb = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Falha ao pegar os dados');
  }).then((convertedResponse) => convertedResponse)
    .catch((err) => console.error(err));
  return {
    props: {
      externalDb,
    },
  };
}

export default QuizDaGalera;
