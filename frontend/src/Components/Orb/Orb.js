import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
  const { width, height } = useWindowSize();

  const moveOrb = keyframes`
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(${width}px, ${height / 2}px);
    }
    100% {
      transform: translate(0, 0);
    }
  `;

  const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    z-index: -1;  // Moves the orb behind other content
    border-radius: 50%;
    margin-left: -35vh;
    margin-top: -35vh;
    background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
    filter: blur(200px);
    animation: ${moveOrb} 15s alternate linear infinite;

    @media (max-width: 768px) {
      width: 50vh;
      height: 50vh;
      margin-left: -25vh;
      margin-top: -25vh;
      filter: blur(150px);
    }
  `;

  return <OrbStyled></OrbStyled>;
}

export default Orb;
