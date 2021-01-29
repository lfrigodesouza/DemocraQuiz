import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen questions={dbExterno.questions} bg={dbExterno.bg} logo={dbExterno.logo} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Fail to fetch quiz data');
    })
    .then((content) => content)
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      dbExterno,
    },
  };
}
