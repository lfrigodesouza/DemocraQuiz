import {
  CheckCircle, CancelRounded, NavigateNext, PlaylistAddCheck,
} from '@material-ui/icons';
import styled from 'styled-components';

export const CorrectAnswerIcon = styled(CheckCircle)`
  color: green;
  margin: 0px 5px;
`;

export const WrongAnswerIcon = styled(CancelRounded)`
  color: red;
  margin: 0px 5px;
`;

export const NextQuestionIcon = styled(NavigateNext)`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0px 5px;
`;

export const ConfirmSelection = styled(PlaylistAddCheck)`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0px 5px;
`;
