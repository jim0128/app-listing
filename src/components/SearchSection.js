import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  height: 39px;
  border-bottom: 1px solid lightgray;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  text-align: center;
  background-color: gainsboro;
  border-radius: 6px;
`;


const SearchSection = ({handleChange, text}) => {

  return (
    <Container>
      <StyledInput
         type="input"
         placeholder="搜尋"
         value={text}
         onChange={handleChange}
       />
    </Container>
  );
}

export default SearchSection;
