import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {addUrlPrefix} from '../helper/addUrlPrefix';
import loadingImage from './loading.png';

const Container = styled.div`
  overflow: hidden;
  border-bottom: 1px solid lightgray;
`;

const StyledH1 = styled.h1`
  padding-left: 20px;
`;

const Wrapper = styled.div`
  width: auto;
  height: 200px;
  white-space: nowrap;
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const AppContainer = styled.a`
  padding: 20px;
  width: 100px;
  height: 200px;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
`;

const Icon = styled.div`
  background-image: url(${props => props.imageLink});
  background-position: center bottom;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 16px;
  height: 100px;
  width: 100px;
`;

const Text = styled.div`
  padding-top: 5px;
  color: ${props => props.textColor};
  font-size: 13px;
  width: 100px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-line;
  height: 34px;
`;

const RecommendationSection = ({text}) => {

  const [appDatas, setAppDatas] = useState([]);

  useEffect(()=> {
    axios.get(addUrlPrefix('https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json'))
    .then(function (response) {
      // handle success
      setAppDatas(response.data.feed.results)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  },[]);

  if(Array.isArray(appDatas) && appDatas.length === 0){
    return null;
  }

  const filteredAppDatas = appDatas.filter(
    appData => appData.name.match(text) || appData.genres[0].name.match(text)
  );

  return (
    <Container>
      <StyledH1>推介</StyledH1>
      <Wrapper>
      {filteredAppDatas.map((appData) => {
        const {artworkUrl100, name, genres, url} = appData;
        return(
          <AppContainer href={url}>
            <Suspense fallback={<Icon imageLink={loadingImage} />}>
              <Icon imageLink={artworkUrl100} />
            </Suspense>
            <Text textColor="black">{name}</Text>
            <Text textColor="gray">
              {genres[0]?.name}
            </Text>
          </AppContainer>
        )
        })}
        </Wrapper>
    </Container>
  );
}

export default RecommendationSection;
