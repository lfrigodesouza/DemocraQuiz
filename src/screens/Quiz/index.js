import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  arrayOf, number, shape, string, func, bool,
} from 'prop-types';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results, name }) {
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        {name ? `Seu resultado, ${name}:` : 'Seu resultado:'}
      </Widget.Header>

      <Widget.Content>
        <p>
          {`Você acertou ${results.filter((result) => !!result).length} das ${
            results.length
          } perguntas`}
        </p>
        <ul>
          {results.map((result, resultIndex) => (
            <li key={`result__${result}`}>
              {`#${String(resultIndex + 1).padStart(2, '0')} Resultado: ${
                result ? 'Acertou' : 'Errou'
              }`}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

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

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
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
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
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
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  checked={isSelected}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  disabled={isQuestionSubmited}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
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

        {screenState === screenStates.RESULT && <ResultWidget results={results} name={name} />}
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

ResultWidget.defaultProps = {
  name: undefined,
};
ResultWidget.propTypes = {
  results: arrayOf(bool).isRequired,
  name: string,
};
