/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import QuizPage from '../../src/screens/Quiz';

export default function Quiz() {
  return <QuizPage questions={db.questions} logo={db.logo} bg={db.bg} />;
}
