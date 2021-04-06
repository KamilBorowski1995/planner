import { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

const Wrapper = styled.div`
  overflow: scroll;
`;

const WrapperElementCalendar = styled.div`
  display: flex;
  font-family: ${theme.font.secondary};
  align-items: center;
  margin-bottom: 10px;
`;

const WrapperDate = styled.div`
  text-align: center;
  margin-left: -5px;
`;

const StyledElementDayWeek = styled.p`
  font-size: ${theme.size.xs};
  font-weight: 300;
  width: 30px;
  color: ${({ themeColors }) => themeColors.secondary};
`;

const StyledElementDay = styled(StyledElementDayWeek)`
  font-size: ${theme.size.m};
  font-weight: 300;
`;

const StyledTaskName = styled.p`
  font-size: ${theme.size.s};
  font-weight: 400;
  flex-grow: 1;
  padding: 5px 10px;
  border: 1px solid ${({ themeColors }) => themeColors.tertiary};
  border-radius: 5px;
`;

function CalendarElement({ dataBase }) {
  const themeColors = useContext(ThemeContext);

  function getDayWeek(date) {
    const days = ["PN", "WT", "ŚR", "CZ", "PT", "SB", "ND"];
    const getDate = new Date(date).getDay();
    return days[getDate];
  }
  function getDayMonth(date) {
    const getDate = new Date(date).getDate();
    return getDate;
  }
  const MapElements = dataBase.elements.map(({ id, title, date }) => (
    <WrapperElementCalendar key={id}>
      <WrapperDate>
        <StyledElementDayWeek themeColors={themeColors}>
          {getDayWeek(date)}
        </StyledElementDayWeek>
        <StyledElementDay themeColors={themeColors}>
          {getDayMonth(date)}
        </StyledElementDay>
      </WrapperDate>
      <StyledTaskName themeColors={themeColors}>{title}</StyledTaskName>
    </WrapperElementCalendar>
  ));

  return <Wrapper> {MapElements}</Wrapper>;
}

export default CalendarElement;
