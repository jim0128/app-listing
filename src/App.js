import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RecommendationSection from './components/RecommendationSection';
import ListingSection from './components/ListingSection';

const Container = styled.div`
  margin: auto;
  max-width: 1000px;
`;

function App() {
  return (
    <Container>
      <RecommendationSection />
      <ListingSection />
    </Container>
  );
}

export default App;
