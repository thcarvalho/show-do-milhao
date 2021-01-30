import React from 'react';
import db from '../../db.json';
import QuizScreen from '../screens/Quiz';

export default function Home() {
  return <QuizScreen db={db} />;
}
