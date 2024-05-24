import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;

const NewElectionButton = styled(Link)`
  background-color: #007bff;
  border-radius: 5px;
  color: white;
  margin-top: 20px;
  padding: 10px 20px;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <h1>Welcome to the Ranked Choice Playground</h1>
      <NewElectionButton to="/wizard">New Election</NewElectionButton>
    </HomeContainer>
  );
}

export default Home;
