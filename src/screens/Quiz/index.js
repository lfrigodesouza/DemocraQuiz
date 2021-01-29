import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  arrayOf, number, shape, string, func,
} from 'prop-types';
import styled from 'styled-components';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';
import BackLinkArrow from '../../components/BackLinkArrow';
import Result from '../../components/Result';
import { CorrectAnswerIcon, WrongAnswerIcon } from '../../components/Icons';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        <Loading />
      </Widget.Content>
    </Widget>
  );
}

const Wrapper = styled.div`
  background-color: rgba(256, 256, 256, 0.25);
  display: flex;
  margin: 0px;
  padding: 0px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 5px 0px;
`;

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt=""
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm
          onSubmit={(evt) => {
            evt.preventDefault();
            setIsQuestionSubmitted(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmitted(false);
              setSelectedAlternative(undefined);
            }, 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                htmlFor={alternativeId}
                as="label"
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  checked={isSelected}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  disabled={isQuestionSubmitted}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          {isQuestionSubmitted && isCorrect && (
            <Wrapper initial="hidden" animate="show">
              <div style={{ fontWeight: 'bold' }}>Você acertou!</div>
              <CorrectAnswerIcon />
            </Wrapper>
          )}
          {isQuestionSubmitted && !isCorrect && (
            <Wrapper>
              <div style={{ fontWeight: 'bold' }}>Você errou!</div>
              <WrongAnswerIcon />
            </Wrapper>
          )}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ questions, bg, logo }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const totalQuestions = questions.length;
  const questionIndex = currentQuestion;
  const question = questions[questionIndex];

  const router = useRouter();
  const { name } = router.query;

  function addResult(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo logo={logo} />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            totalQuestions={totalQuestions}
            question={question}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <Result results={results} name={name} />}
      </QuizContainer>
    </QuizBackground>
  );
}

QuizPage.defaultProps = {
  logo: undefined,
};
QuizPage.propTypes = {
  questions: arrayOf(
    shape({
      image: string.isRequired,
      title: string.isRequired,
      description: string,
      answer: number,
      alternatives: arrayOf(string).isRequired,
    }),
  ).isRequired,
  bg: string.isRequired,
  logo: string,
};

QuestionWidget.propTypes = {
  question: shape({
    image: string.isRequired,
    title: string.isRequired,
    description: string,
    answer: number,
    alternatives: arrayOf(string).isRequired,
  }).isRequired,
  totalQuestions: number.isRequired,
  questionIndex: number.isRequired,
  onSubmit: func.isRequired,
  addResult: func.isRequired,
};
