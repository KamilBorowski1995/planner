import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import MobileTemplate from "templates/MobileTemplate";
import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import ListElements from "components/ListElements";

import { dataBase } from "database";

const WrapperElements = styled.div`
  max-height: ${({ size }) => `${size}px`};

  display: flex;
  flex-direction: column;

  font-family: ${theme.font.secondary};
`;

const StyledTitle = styled.h2`
  margin-bottom: 20px;
  color: ${({ themeColors }) => themeColors.secondary};
  font-size: ${theme.size.xl};
  font-weight: 500;
`;

const WrapperInput = styled.div`
  display: grid;
  grid-template-columns: 85% 1fr;
  font-family: ${theme.font.secondary};

  margin-bottom: 30px;
`;

const StyledInput = styled.input`
  border: 1px solid ${({ themeColors }) => themeColors.tertiary};
  border-radius: 10px;
  padding: 10px 15px;
  background-color: transparent;
  color: ${theme.colors.dark.secondary};
  font-size: ${theme.size.m};

  ::placeholder {
    font-family: ${({ themeColors }) => themeColors.secondary};
    letter-spacing: 1px;
    color: ${({ themeColors }) => themeColors.tertiary};
    font-size: ${theme.size.s};
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  color: ${({ themeColors }) => themeColors.tertiary};
  font-size: ${theme.size.xl};
  border: none;

  transition: 0.3s ease-in-out;

  :hover {
    color: ${({ themeColors }) => themeColors.secondary};
  }
`;

function List() {
  const [heightWrapperNav, setHeightWrapperNav] = useState(50);
  const [size, setSize] = useState(150);

  const themeColors = useContext(ThemeContext);

  useEffect(() => {
    const heightSite = document.body.clientHeight;
    setSize(heightSite - heightWrapperNav);
  }, [size, heightWrapperNav]);

  const setHeight = (height) => setHeightWrapperNav(height);

  return (
    <MobileTemplate setHeight={setHeight}>
      <WrapperElements size={size}>
        <StyledTitle themeColors={themeColors}>{dataBase.name}</StyledTitle>

        <WrapperInput>
          <StyledInput
            themeColors={themeColors}
            type="text"
            placeholder="Dodaj nowe zadanie..."
          />
          <StyledButton themeColors={themeColors}>+</StyledButton>
        </WrapperInput>

        <ListElements dataBase={dataBase} />
      </WrapperElements>
    </MobileTemplate>
  );
}

export default List;
