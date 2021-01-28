import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Input from '../Input';

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
          name="nomeUsuario"
          value={name}
        />
        <Button type="submit" disabled={name.length === 0}>
          {`Vamos jogar ${name}`}
        </Button>
      </FormWrapper>
    </form>
  );
}
