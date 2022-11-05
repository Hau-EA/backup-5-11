import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import ButtonCommon from '../../../common/ButtonCommon';
import { START_REGISTER_REQUIREDS } from '../../../../constants';

const StartRegisterMobile = ({ setStarted }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <StartRegisterMobileStyled>
      <Paragraph>
        To start the registration process, please check the below information
        and click START:
      </Paragraph>
      <CarouselStyled activeIndex={index} onSelect={handleSelect}>
        {START_REGISTER_REQUIREDS.map((item, i) => (
          <CarouselItem key={i}>
            <ImageStyled>
              <img className="d-block" src={item.imgUrl} alt="carousel-item" />
            </ImageStyled>
            <Carousel.Caption>
              <p>{item.label}</p>
            </Carousel.Caption>
          </CarouselItem>
        ))}
      </CarouselStyled>
      <Paragraph style={{ paddingTop: '64px' }}>
        Watch this video to help you with registration
      </Paragraph>
      <VideoEmbed>
        <iframe
          width="100%"
          height="172"
          src="https://www.youtube.com/embed/mcVJPhxlsjQ"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </VideoEmbed>
      <StartFixed>
        <ButtonCommon
          value="START"
          onClick={() => setStarted(true)}
          styles={{
            margin: '0px',
            fontSize: '14px',
            width: '100%',
          }}
          color="var(--ds-c-grey-dark)"
          background="var(--ds-c-yellow)"
        />
      </StartFixed>
    </StartRegisterMobileStyled>
  );
};

const StartRegisterMobileStyled = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`;

const Paragraph = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: var(--ds-c-grey-dark);

  margin-bottom: 24px;
`;

const CarouselStyled = styled(Carousel)`
  width: 100%;
  height: 200px;
  background-color: var(--ds-c-white);

  & .carousel-inner {
    height: 100%;
  }

  & .carousel-control-prev,
  & .carousel-control-next {
    display: none;
  }

  & .carousel-indicators {
    margin-bottom: 0;
    bottom: -24px;

    button {
      background: var(--ds-c-yellow-disabled);
      border-radius: 50%;
      width: 8px;
      height: 8px;
      border: none;
    }

    & .active {
      background: var(--ds-c-yellow);
    }
  }
`;
const CarouselItem = styled(Carousel.Item)`
  height: 100%;
  background-color: var(--ds-c-white);

  & .carousel-caption {
    bottom: 0px;
    top: 138px;
    padding: 0;

    p {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      text-align: center;

      color: var(--ds-c-grey-dark);
      margin-bottom: 0px;
    }
  }
`;
const ImageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  img {
    width: 100px;
    height: 100px;
  }
`;

const VideoEmbed = styled.div``;

const StartFixed = styled.div`
  position: fixed;
  bottom: 16px;
  left: 24px;
  width: calc(100% - 48px);
  background: var(--ds-c-white);
`;

export default StartRegisterMobile;
