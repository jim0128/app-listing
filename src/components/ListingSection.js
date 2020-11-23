import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {addUrlPrefix} from '../helper/addUrlPrefix';

const AppContainer = styled.a`
  padding: 20px;
  height: 100px;
  display: block;
  cursor: pointer;
  text-decoration: none;
  border-bottom: 1px solid lightgray;
  overflow-y: hidden;
`;

const AppIndex = styled.div`
  color: gray;
  font-size: 24px;
  display: inline-block;
  vertical-align: top;
  padding-right: 20px;
  line-height: 100px;
  width: 40px;
`;

const Icon = styled.div`
  background-image: url(${props => props.imageLink});
  background-position: center bottom;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: ${props => props.evenIndex ? "50px" : "16px" };
  height: 100px;
  width: 100px;
  display: inline-block;
`;

const TextContainer = styled.div`
  display: inline-block;
  padding-left: 20px;
`;

const Text = styled.div`
  padding-top: 5px;
  color: ${props => props.textColor};
  font-size: 16px;
  width: 100px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: pre-line;
`;

function ListingSection() {

  const [appDatas, setAppDatas] = useState([]);

  useEffect(()=> {
    axios.get(addUrlPrefix('https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/10/explicit.json'))
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

  return (
    <div>
      {appDatas.map((appData, index) => {
        const {artworkUrl100, name, genres, url} = appData;
        return(
          <AppContainer href={url}>
            <AppIndex>
            {index + 1}
            </AppIndex>
            <Icon imageLink={artworkUrl100} evenIndex={index%2} />
            <TextContainer>
              <Text textColor="black">{name}</Text>
              <Text textColor="gray">
                {genres[0].name}
              </Text>
            </TextContainer>
          </AppContainer>
        )
        })}
    </div>
  );
}

export default ListingSection;
