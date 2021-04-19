import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

import MobileTemplate from "templates/MobileTemplate";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import CalendarElement from "components/CalendarElement";
import Auth from "Functions/Auth";
import EditNote from "views/EditNote";

import {
  selectDate,
  getMonth,
  handleSelectNotes,
  getYearAndMonth,
} from "Functions/functionCalendar";

const Wrapper = styled.div`
  max-height: ${({ size }) => `${size}px`};

  display: flex;
  flex-direction: column;
  font-family: ${theme.font.secondary};
  position: relative;
`;

const StyledTitle = styled.h2`
  margin-bottom: 20px;
  color: ${({ themeColors }) => themeColors.secondary};
  font-size: ${theme.size.xl};
  font-weight: 500;
`;
const StyledSelect = styled.select`
  margin-bottom: 20px;
  background-color: transparent;
  color: ${({ themeColors }) => themeColors.secondary};
  font-size: ${theme.size.l};
  padding: 10px;
  font-weight: 500;

  border: none;

  border-bottom: 2px solid ${({ themeColors }) => themeColors.secondary};

  option {
    background-color: ${({ themeColors }) => themeColors.secondary};
    color: ${({ themeColors }) => themeColors.primary};
    font-size: ${theme.size.s};
  }
`;

function Calendar() {
  const [heightWrapperNav, setHeightWrapperNav] = useState(50);
  const [size, setSize] = useState(150);
  const [allNotes, setAllNotes] = useState([]);
  const [selectNotes, setSelectNotes] = useState([]);
  const [allMonth, setAllMonth] = useState([]);

  const [currentDate, setCurrentDate] = useState([]);
  // const [selectDateState, setSelectDateState] = useState([]);

  const [activeNote, setActiveNote] = useState("");

  const themeColors = useContext(ThemeContext);
  const history = useHistory();

  function getNotes() {
    axios.defaults.withCredentials = true;
    axios
      .get(process.env.REACT_APP_GET_NOTE_PATH)
      .then(function (response) {
        setAllNotes(response.data);
      })
      .catch(function (error) {
        if (error.response.data === "UserErr") {
          Auth.logout(() => {
            history.push("/login");
          });
        }
      });
  }

  useEffect(() => {
    const handler = handleSelectNotes(allNotes, currentDate);

    setSelectNotes(handler);

    function setMonthFromNotes() {
      const arrDate = selectDate(allNotes);
      setAllMonth(arrDate);
    }

    setMonthFromNotes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allNotes]);

  useEffect(() => {
    const currentData = new Date();
    const currentMonth = currentData.getMonth() + 1;
    const currentYear = currentData.getFullYear();

    function editMonth(month) {
      if (month > 9) return `${month}`;
      if (month < 10) return `0${month}`;
    }

    const correctMonth = editMonth(currentMonth);

    setCurrentDate([currentYear, correctMonth]);
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const heightSite = document.body.clientHeight;
    setSize(heightSite - heightWrapperNav);
  }, [size, heightWrapperNav]);

  const setHeight = (height) => setHeightWrapperNav(height);

  const handleButtonEdit = (e, id) => {
    setActiveNote(id);
  };

  const handleButtonClose = () => {
    setActiveNote("");
    getNotes();
  };

  const OptionsMap = allMonth.map(({ year, month }) => (
    <option
      themeColors={themeColors}
      value={year + month}
      selected={currentDate[0] + currentDate[1] === year + month ? true : false}
    >
      {getYearAndMonth(year, month, currentDate)}
    </option>
  ));

  const handleSelectDate = (e) => {
    const year = e.target.value.slice(0, 4) * 1;
    const month = e.target.value.slice(4) * 1;

    // setSelectDateState([year, month]);

    const newDateArr = [year, month];
    const handler = handleSelectNotes(allNotes, newDateArr);
    setSelectNotes(handler);
  };

  return (
    <MobileTemplate setHeight={setHeight}>
      <Wrapper size={size}>
        {activeNote !== "" ? (
          <EditNote
            size={size}
            id={activeNote}
            handleButtonClose={handleButtonClose}
            handleButtonEdit={handleButtonEdit}
          />
        ) : (
          <>
            <StyledSelect
              themeColors={themeColors}
              name="date"
              id="date"
              onChange={handleSelectDate}
            >
              {OptionsMap}
            </StyledSelect>
            {selectNotes.length > 0 && (
              <CalendarElement
                dataBase={selectNotes}
                handleButtonEdit={handleButtonEdit}
              />
            )}
          </>
        )}
      </Wrapper>
    </MobileTemplate>
  );
}

export default Calendar;
