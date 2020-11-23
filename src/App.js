import { useState } from 'react';
import styled from 'styled-components';
import RecommendationSection from './components/RecommendationSection';
import ListingSection from './components/ListingSection';
import SearchSection from './components/SearchSection';

const Container = styled.div`
  margin: auto;
  max-width: 1000px;
`;

const App = () => {
  const [text, setText] = useState('');
  const handleChange = e => {
    setText(e.target.value);
  };

  return (
    <Container>
      <SearchSection handleChange={handleChange} text={text}/>
      <RecommendationSection text={text}/>
      <ListingSection text={text}/>
    </Container>
  );
}

export default App;
