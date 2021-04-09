import { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import MobileTemplate from "templates/MobileTemplate";
import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import ListElements from "components/ListElements";

import { dataBase } from "database";
import Auth from "Functions/Auth";

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

const WrapperAddTask = styled.div`
  display: grid;
  grid-template-columns: 85% 1fr;

  font-family: ${theme.font.secondary};

  margin-bottom: 30px;
`;
const WrapperInput = styled.div`
  border: 1px solid ${({ themeColors }) => themeColors.tertiary};
  border-radius: 10px;
  padding: 0 15px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 0;
  border: none;

  border-bottom: ${({ activeAddPanel, themeColors }) =>
    activeAddPanel === true
      ? `1px solid ${themeColors.tertiary}`
      : `1px solid transparent`};

  background-color: transparent;
  color: ${theme.colors.dark.secondary};
  font-size: ${theme.size.m};
  transition: 0.3s ease-in-out;

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

const StyledInputDate = styled(StyledInput)`
  width: max-content;
  ::-webkit-calendar-picker-indicator {
    opacity: 1;
    font-size: 20px;
  }
`;

function List() {
  const [heightWrapperNav, setHeightWrapperNav] = useState(50);
  const [size, setSize] = useState(150);
  const [inputValue, setInputValue] = useState("");
  const [inputDateValue, setInputDateValue] = useState("");

  const [activeAddPanel, setActiveAddPanel] = useState(false);

  const inputDateRef = useRef(null);

  const themeColors = useContext(ThemeContext);

  const history = useHistory();

  useEffect(() => {
    const heightSite = document.body.clientHeight;
    setSize(heightSite - heightWrapperNav);
  }, [size, heightWrapperNav]);

  function setDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    const today = year + "-" + month + "-" + day;
    if (inputDateRef.current) {
      inputDateRef.current.value = today;
      setInputDateValue(inputDateRef.current.value);
    }
  }

  useEffect(() => {
    setDate();
  }, [activeAddPanel]);

  const setHeight = (height) => setHeightWrapperNav(height);

  const handleSendTaksButton = (e) => {
    const dateYear = inputDateValue.substr(0, 4);
    const dateMonth = inputDateValue.substr(5, 2);
    const dateDay = inputDateValue.substr(-2);

    const newTask = {
      note: inputValue,
      date: [dateYear, dateMonth, dateDay],
    };

    axios.defaults.withCredentials = true;
    axios
      .post(process.env.REACT_APP_ADD_NOTE_PATH, newTask)
      .then(function (response) {
        console.log(response);

        setInputValue("");
        setActiveAddPanel(false);
      })
      .catch(function (error) {
        if (error.response.data === "UserErr") {
          console.log("Mamy błąd więc");
          Auth.logout(() => {
            console.log("Wykonam?");
            history.push("/login");
          });
        }
      });
  };

  return (
    <MobileTemplate setHeight={setHeight}>
      <WrapperElements size={size}>
        <StyledTitle themeColors={themeColors}>{dataBase.name}</StyledTitle>

        <WrapperAddTask>
          <WrapperInput
            themeColors={themeColors}
            onClick={() => setActiveAddPanel(true)}
          >
            <StyledInput
              themeColors={themeColors}
              activeAddPanel={activeAddPanel}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Dodaj nowe zadanie..."
            />
            {activeAddPanel && (
              <StyledInputDate
                ref={inputDateRef}
                min="2021-04-01"
                type="date"
                value={inputDateValue}
                themeColors={themeColors}
                onChange={(e) => setInputDateValue(e.target.value)}
              />
            )}
          </WrapperInput>
          <StyledButton
            onClick={handleSendTaksButton}
            themeColors={themeColors}
          >
            +
          </StyledButton>
        </WrapperAddTask>

        <ListElements dataBase={dataBase} />
      </WrapperElements>
    </MobileTemplate>
  );
}

export default List;
