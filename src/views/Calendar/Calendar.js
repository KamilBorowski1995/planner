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

function Calendar() {
  const [heightWrapperNav, setHeightWrapperNav] = useState(50);
  const [size, setSize] = useState(150);
  const [allNotes, setAllNotes] = useState([]);

  const [activeNote, setActiveNote] = useState("");

  const themeColors = useContext(ThemeContext);

  const history = useHistory();

  useEffect(() => {
    const heightSite = document.body.clientHeight;
    setSize(heightSite - heightWrapperNav);
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

  const handleButtonEdit = (e, id) => {
    setActiveNote(id);
  };

  const handleButtonClose = () => {
    setActiveNote("");
  };

  return (
    <MobileTemplate setHeight={setHeight}>
      <Wrapper size={size}>
        {activeNote !== "" ? (
          <EditNote
            size={size}
            id={activeNote}
            handleButtonClose={handleButtonClose}
          />
        ) : (
          <>
            <StyledTitle themeColors={themeColors}>Marzec</StyledTitle>
            {allNotes.length > 0 && (
              <CalendarElement
                dataBase={allNotes}
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
