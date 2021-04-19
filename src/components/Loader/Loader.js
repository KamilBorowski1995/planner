import { useContext } from "react";

import { ThemeContext } from "context/context";

import styled, { keyframes } from "styled-components";

const AnimationLoader = () => keyframes`
from {  transform:rotate(0)}
 to { transform:rotate(360deg)}
`;

const Wrapper = styled.div`
  margin: 20% auto 0;

  width: 100px;
  height: 100px;

  border-radius: 50%;
  border-right: 10px solid ${({ themeColors }) => themeColors.secondary};
  border-left: 10px solid ${({ themeColors }) => themeColors.secondary};
  border-top: 10px solid ${({ themeColors }) => themeColors.tertiary};
  border-bottom: 10px solid ${({ themeColors }) => themeColors.tertiary};

  animation: ${AnimationLoader} 1.5s ease-in-out infinite;
`;

const Loader = () => {
  const themeColors = useContext(ThemeContext);

  return <Wrapper themeColors={themeColors} />;
};

export default Loader;
