import React from 'react';
import styled from 'styled-components';

export const StyledSvg = styled.svg`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  fill: ${props => props.color};
`;

const StarIcon = ({ size, color }) => (
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    size={size}
    color={color}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M17.954 8.811a1.52 1.52 0 0 1-.392.732l-2.693 2.746.642 3.887c.072.475-.047.894-.356 1.257a1.48 1.48 0 0 1-1.177.544c-.262 0-.511-.066-.75-.197l-3.226-1.783-3.228 1.783c-.238.131-.487.197-.749.197a1.48 1.48 0 0 1-1.177-.544 1.509 1.509 0 0 1-.356-1.257l.642-3.887L2.44 9.543a1.589 1.589 0 0 1-.401-.74c-.065-.28-.05-.56.045-.839a1.558 1.558 0 0 1 1.23-1.043L6.97 6.37l1.64-3.477c.131-.286.328-.506.59-.66a1.498 1.498 0 0 1 1.604 0c.261.154.458.374.588.66l1.64 3.477 3.656.552a1.558 1.558 0 0 1 1.23 1.043c.096.28.107.562.036.847z"
    />
  </StyledSvg>
);

export default StarIcon;
