import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <img alt="Loading" width="50px" src="https://i.postimg.cc/ydvcgCb0/loading.gif" />
    </LoadingWrapper>
  );
}
