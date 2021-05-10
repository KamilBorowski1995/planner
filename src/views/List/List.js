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
import Loader from "components/Loader";

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

const ErrorInfo = styled.p`
  margin: 10px 0 30px;
  color: ${({ themeColors }) => themeColors.secondary};
  font-size: ${theme.size.m};
  font-weight: 500;
  text-align: center;
`;

function List() {
  const [heightWrapperNav, setHeightWrapperNav] = useState(50);
  const [size, setSize] = useState(150);
  const [loaded, setLoaded] = useState(true);

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
    setLoaded(false);
    axios.defaults.withCredentials = true;
    axios
      .get(process.env.REACT_APP_GET_NOTE_PATH, {
        headers: {
          "auth-token": sessionStorage.getItem("auth-token"),
        },
      })
      .then(function (response) {
        setAllNotes(response.data);
        setLoaded(true);
      })
      .catch(function (error) {
        setLoaded(true);

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
    setLoaded(false);
    const dateYear = state.date.substr(0, 4);
    const dateMonth = state.date.substr(5, 2);
    const dateDay = state.date.substr(-2);

    const newTask = {
      note: state.text,
      date: [dateYear, dateMonth, dateDay],
    };

    axios.defaults.withCredentials = true;
    axios
      .post(process.env.REACT_APP_ADD_NOTE_PATH, newTask, {
        headers: {
          "auth-token": sessionStorage.getItem("auth-token"),
        },
      })
      .then(function (response) {
        dispatch({ type: "SET_VALUE", name: "text", value: "" });
        setLoaded(true);
        getNotes();
      })
      .catch(function (error) {
        if (error.response.data === "UserErr") {
          Auth.logout(() => {
            history.push("/login");
          });
          setLoaded(true);
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

        {loaded === false && <Loader />}
        {allNotes.length > 0 ? (
          <ListElements dataBase={allNotes} />
        ) : (
          <ErrorInfo themeColors={themeColors}>Brak zadań</ErrorInfo>
        )}
      </WrapperElements>
    </MobileTemplate>
  );
}

export default List;
