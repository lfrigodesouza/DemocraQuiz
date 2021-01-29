import { CheckCircle, CancelRounded } from '@material-ui/icons';
import styled from 'styled-components';

export const CorrectAnswerIcon = styled(CheckCircle)`
  color: green;
  margin: 0px 5px;
  font-weight: bolder;
`;

export const WrongAnswerIcon = styled(CancelRounded)`
  color: red;
  margin: 0px 5px;
  font-weight: bold;
`;
