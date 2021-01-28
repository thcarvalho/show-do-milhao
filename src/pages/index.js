import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../../db.json';
import Footer from '../components/Footer';
import GitHubCorner from '../components/GitHubCorner';
import QuizBackground from '../components/QuizBackground';
import QuizContainer from '../components/QuizContainer';
import QuizLogo from '../components/QuizLogo';
import { Widget } from '../components/Widget';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  function navigateToQuiz(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={navigateToQuiz}>
              <Input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Quem é o participante?" />
              {
                name && (
                  <Button type="submit" disabled={!name}>
                    Jogar
                    {' '}
                    {name}
                  </Button>
                )
              }
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/thcarvalho/show-do-milhao" />
    </QuizBackground>
  );
}
