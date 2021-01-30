import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import GitHubCorner from '../../components/GitHubCorner';
import Input from '../../components/Input';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import { Widget } from '../../components/Widget';
import Silvio from '../../components/Silvio';

function Quiz({ db }) {
  const [name, setName] = useState('');
  const router = useRouter();

  function navigateToQuiz(e) {
    e.preventDefault();
    router.push({ pathname: '/quiz', query: { name } });
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ duration: 0.5, type: 'spring' }}
          variants={{
            show: { x: 0, opacity: 1 },
            hidden: { x: -500, opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
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
                  </Button>
                )
              }
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ duration: 0.5, type: 'spring', delay: 0.1 }}
          variants={{
            show: { x: 0, opacity: 1 },
            hidden: { x: -500, opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((link) => {
                const [projectName, githubUser] = link.replace('https://', '').replace('.vercel.app/', '').split('.');
                return (
                  <li key={link}>
                    <Widget.Topic href={`quiz/${projectName}___${githubUser}`}>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
          variants={{
            show: { x: 0, opacity: 1 },
            hidden: { x: -500, opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>

      <Silvio
        as={motion.img}
        transition={{ duration: 0.5, delay: 0.3 }}
        variants={{
          show: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        initial="hidden"
        animate="show"
        alt="Silvão"
        src="/silvao.png"
      />

      <GitHubCorner projectUrl="https://github.com/thcarvalho/show-do-milhao" />
    </QuizBackground>
  );
}

export default Quiz;
