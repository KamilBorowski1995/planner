import { useState, useEffect, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import MobileTemplate from "templates/MobileTemplate";
import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import ListElements from "components/ListElements";

import Auth from "Functions/Auth";
import AddTask from "components/AddTask";
import { reducerInput } from "reducers/reducerInput";

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

function List() {
  const [heightWrapperNav, setHeightWrapperNav] = useState(50);
  const [size, setSize] = useState(150);

  const [allNotes, setAllNotes] = useState([]);

  const [state, dispatch] = useReducer(reducerInput, {
    text: "",
    date: "",
  });

  const themeColors = useContext(ThemeContext);
  const history = useHistory();

  useEffect(() => {
    const heightSite = document.body.clientHeight;
    setSize(heightSite - heightWrapperNav - 50);
  }, [size, heightWrapperNav]);

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
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setHeight = (height) => setHeightWrapperNav(height);

  const handleSendTaksButton = (e) => {
    const dateYear = state.date.substr(0, 4);
    const dateMonth = state.date.substr(5, 2);
    const dateDay = state.date.substr(-2);

    const newTask = {
      note: state.text,
      date: [dateYear, dateMonth, dateDay],
    };

    axios.defaults.withCredentials = true;
    axios
      .post(process.env.REACT_APP_ADD_NOTE_PATH, newTask)
      .then(function (response) {
        dispatch({ type: "SET_VALUE", name: "text", value: "" });
        getNotes();
      })
      .catch(function (error) {
        if (error.response.data === "UserErr") {
          Auth.logout(() => {
            history.push("/login");
          });
        }
      });
  };

  const handleDispatch = (e) => {
    dispatch({ type: "SET_VALUE", name: e.target.type, value: e.target.value });
  };

  return (
    <MobileTemplate setHeight={setHeight}>
      <WrapperElements size={size}>
        <StyledTitle themeColors={themeColors}>Zadania</StyledTitle>
        <WrapperAddTask>
          <AddTask
            dispatch={dispatch}
            handleDispatch={handleDispatch}
            state={state}
          />
          <StyledButton
            onClick={handleSendTaksButton}
            themeColors={themeColors}
          >
            +
          </StyledButton>
        </WrapperAddTask>

        {allNotes.length > 0 && <ListElements dataBase={allNotes} />}
      </WrapperElements>
    </MobileTemplate>
  );
}

export default List;
