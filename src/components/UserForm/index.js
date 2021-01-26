import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.mainBg};
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};

  &::placeholder {
    color: ${({ theme }) => theme.colors.lightContrastText};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  margin: 10px 0px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function UserForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        router.push(`/quiz?name=${name}`);
      }}
    >
      <FormWrapper>
        <Input
          onChange={(evt) => {
            setName(evt.target.value);
          }}
          placeholder="Informe seu nome"
        />
        <Button type="submit" disabled={name.length === 0}>
          {`Vamos jogar ${name}!`}
        </Button>
      </FormWrapper>
    </form>
  );
}
