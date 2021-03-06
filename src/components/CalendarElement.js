import { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

const Wrapper = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
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

function CalendarElement({ dataBase, handleButtonEdit }) {
  const themeColors = useContext(ThemeContext);
  const [dateDB, setDateDB] = useState([]);

  function getDayWeek(date) {
    const days = ["ND", "PN", "WT", "ŚR", "CZ", "PT", "SB"];
    const getDate = new Date(date).getDay();

    return days[getDate];
  }
  function getDayMonth(date) {
    const getDate = new Date(date).getDate();
    return getDate;
  }

  function sortDate(db) {
    function compareDay(a, b) {
      if (a.date[2] * 1 < b.date[2] * 1) return -1;
      if (a.date[2] * 1 > b.date[2] * 1) return 1;
      return 0;
    }

    const sortArrayDay = db.sort(compareDay);
    setDateDB(sortArrayDay);
  }

  useEffect(() => {
    sortDate(dataBase);
  }, [dataBase]);
  const MapElements = dateDB.map(({ id, note, date }) => (
    <WrapperElementCalendar
      key={id}
      onClick={(e) => {
        handleButtonEdit(e, id);
      }}
    >
      <WrapperDate>
        <StyledElementDayWeek themeColors={themeColors}>
          {getDayWeek(date)}
        </StyledElementDayWeek>
        <StyledElementDay themeColors={themeColors}>
          {getDayMonth(date)}
        </StyledElementDay>
      </WrapperDate>
      <StyledTaskName themeColors={themeColors}>{note}</StyledTaskName>
    </WrapperElementCalendar>
  ));

  return <Wrapper> {MapElements}</Wrapper>;
}

export default CalendarElement;
