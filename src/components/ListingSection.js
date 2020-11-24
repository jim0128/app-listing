import { useEffect, useState, useRef, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {addUrlPrefix} from '../helper/addUrlPrefix';
import StarIcon from './StarIcon';
import loadingImage from './loading.png';

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
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: pre-line;
  padding: ${props => props.isMiddle ? "23px 0" : "0" };
  vertical-align: top;
  @media (max-width: 640px) {
    width: 200px;
  }
  @media (max-width: 420px) {
    width: 100px;
  }
`;

const RatingContainer = styled.div`
  color: gray;
`;

const ListingSection = ({text}) => {

  const [appDatas, setAppDatas] = useState([]);
  const [appIds, setAppIds] = useState([]);
  const [appDetails, setAppDetails] = useState([]);
  const [currentAppItemNumber, setCurrentAppItemNumber] = useState(10);
  const divRef = useRef(document.createElement('div'));

  useEffect(()=> {
    axios.get(addUrlPrefix(`https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/${currentAppItemNumber}/explicit.json`))
    .then(function (response) {
      // handle success
      const results = response.data.feed.results;
      const newAppIds = results.map(app => app.id);
      setAppDatas(results);
      setAppIds(newAppIds);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  },[currentAppItemNumber]);

  useEffect(()=> {
    axios.get(addUrlPrefix(`https://itunes.apple.com/hk/lookup?id=${appIds}`))
    .then(function (response) {
      // handle success
      const results = response.data.results;
      setAppDetails(results);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  },[appIds]);

  const listenToScroll = () => {
    if(window.innerHeight + window.pageYOffset === divRef?.current?.offsetTop){
      setCurrentAppItemNumber(prev => {
        if(prev < 100){
          return prev + 10;
        }
        return 100;
      });
    }
  };

  useEffect(()=>{
    if(window !== undefined ){
      window.addEventListener("scroll", listenToScroll);
    }

    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };

  }, []);

  const filteredAppDatas = appDatas.filter(
    appData => appData.name.match(text) || appData.genres[0].name.match(text)
  );

  return (
    <div>
      {filteredAppDatas.map((appData, index) => {
        const {artworkUrl100, name, genres, url, artistId} = appData;
        const appDetail = appDetails.find(
          appDetail => appDetail.artistId === parseInt(artistId)
        );
        return(
          <AppContainer href={url} key={name}>
            <AppIndex>
            {index + 1}
            </AppIndex>
            <Suspense fallback={<Icon imageLink={loadingImage} evenIndex={index%2} />} >
              <Icon imageLink={artworkUrl100} evenIndex={index%2} />
            </Suspense>
            <TextContainer>
              <Text textColor="black">{name}</Text>
              <Text textColor="gray" isMiddle={true}>
                {genres[0].name}
              </Text>
              <RatingContainer>
                {[...Array(5)].map((e, i) => <StarIcon size="15" color={Math.round(appDetail?.averageUserRating) > i + 1 ? "orange" : "palegoldenrod"} />)}
                {`(${appDetail?.userRatingCount})`}
              </RatingContainer>
            </TextContainer>
          </AppContainer>
        )
        })}
        {!text && (
          <>
            <h1>Fetching Data, Please wait .....</h1>
            <div ref={divRef}/>
          </>
        )}
    </div>
  );
}

export default ListingSection;
