import { useState, useEffect, useContext, useRef } from "react";

import styled from "styled-components";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

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

const StyledInputDate = styled(StyledInput)`
  width: max-content;
  ::-webkit-calendar-picker-indicator {
    opacity: 1;
    font-size: 20px;
  }
`;

const AddTask = ({ handleDispatch, dispatch, state }) => {
  const [activeAddPanel, setActiveAddPanel] = useState(false);
  const inputDateRef = useRef(null);
  const themeColors = useContext(ThemeContext);

  useEffect(() => {
    if (state.text === "") {
      setActiveAddPanel(false);
    } else {
      setActiveAddPanel(true);
    }
  }, [state.text]);

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

      dispatch({
        type: "SET_VALUE",
        name: "date",
        value: inputDateRef.current.value,
      });
    }
  }

  useEffect(() => {
    setDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAddPanel]);

  return (
    <WrapperInput themeColors={themeColors}>
      <StyledInput
        themeColors={themeColors}
        activeAddPanel={activeAddPanel}
        type="text"
        value={state.text}
        onChange={handleDispatch}
        placeholder="Dodaj nowe zadanie..."
      />
      {activeAddPanel && (
        <StyledInputDate
          ref={inputDateRef}
          min="2021-04-01"
          type="date"
          value={state.date}
          themeColors={themeColors}
          onChange={handleDispatch}
        />
      )}
    </WrapperInput>
  );
};

export default AddTask;
