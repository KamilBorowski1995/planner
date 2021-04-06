import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import MobileTemplate from "templates/MobileTemplate";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import { dataBase } from "database";
import CalendarElement from "components/CalendarElement";

const Wrapper = styled.div`
  max-height: ${({ size }) => `${size}px`};

  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  margin-bottom: 20px;
  color: ${({ themeColors }) => themeColors.secondary};
  font-size: ${theme.size.xl};
  font-weight: 500;
`;

function Calendar() {
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
      <Wrapper size={size}>
        <StyledTitle themeColors={themeColors}>Marzec</StyledTitle>
        <CalendarElement dataBase={dataBase} />
      </Wrapper>
    </MobileTemplate>
  );
}

export default Calendar;
