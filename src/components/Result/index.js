import React from 'react';
import { arrayOf, string, bool } from 'prop-types';
import styled from 'styled-components';
import BackLinkArrow from '../BackLinkArrow';
import Widget from '../Widget';
import { CorrectAnswerIcon, WrongAnswerIcon } from '../Icons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const ResultItem = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 5px;
  padding: 7px 25px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
`;

export default function Result({ name, results }) {
  const totalQuestions = results.length;
  const correctAnswers = results.filter((result) => !!result).length;
  const wrongAnswers = results.filter((result) => !result).length;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{name ? `Seu resultado, ${name}:` : 'Seu resultado:'}</h3>
      </Widget.Header>
      <Widget.Content>
        <Wrapper>
          <h4>
            {correctAnswers > wrongAnswers
              ? `Parabéns! Você acertou ${correctAnswers} de `
              : `Poxa, você errou ${wrongAnswers} de `}
            {`${totalQuestions} questões:`}
          </h4>
          <ul>
            {results.map((result, resultIndex) => {
              const questionPosition = resultIndex + 1;
              return (
                <ResultItem as="li" key={`result__${questionPosition}`}>
                  {`${String(questionPosition).padStart(2, '0')}º Questão: `}
                  {result ? <CorrectAnswerIcon /> : <WrongAnswerIcon />}
                </ResultItem>
              );
            })}
          </ul>
        </Wrapper>
      </Widget.Content>
    </Widget>
  );
}

Result.defaultProps = {
  name: undefined,
};
Result.propTypes = {
  results: arrayOf(bool).isRequired,
  name: string,
};
