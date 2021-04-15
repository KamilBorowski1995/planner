import { useState, useEffect, useContext, useRef } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

const AnimationOpen = (size) => keyframes`
from {  height: 0}
/* 50% { height: ${size * 0.7}px}
70% { height: ${size * 0.9}px} */
to { height: ${size}px}
`;

const AnimationLoader = (size) => keyframes`
from {  transform:rotate(0)}
 to { transform:rotate(360deg)}
`;

const Wrapper = styled.div`
  position: absolute;
  width: 101%;
  height: ${({ size }) => `${size}px`};
  left: 0;
  top: 0;
  background-color: ${({ themeColors }) => themeColors.primary};

  /* animation: ${({ size }) => AnimationOpen(size)} 0.6s ease-in; */
  animation: ${({ size }) => AnimationOpen(size)} 0s ease-in;
`;

const StyledButton = styled.button`
  background-color: transparent;
  position: absolute;
  left: 0;
  top: 0;
  line-height: 30px;
  color: ${({ themeColors }) => themeColors.tertiary};
  font-size: ${theme.size.xxl};
  border: none;

  :focus {
    height: 30px;
  }

  transition: 0.3s ease-in-out;
  transform: rotate(45deg);

  :hover {
    color: ${({ themeColors }) => themeColors.secondary};
  }
`;

const StyledTextArea = styled.textarea`
  margin-top: 50px;

  width: 100%;
  height: ${({ textAreaHeight }) => `${textAreaHeight}px`};
  padding: 10px 0;
  border: none;

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

const StyledInputDate = styled.input`
  width: max-content;
  padding: 10px 0;
  border: none;

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

  ::-webkit-calendar-picker-indicator {
    opacity: 1;
    font-size: 20px;
  }
`;

const Loader = styled.div`
  margin: 20% auto 0;

  width: 100px;
  height: 100px;

  border-radius: 50%;
  border-right: 10px solid ${({ themeColors }) => themeColors.secondary};
  border-left: 10px solid ${({ themeColors }) => themeColors.secondary};
  border-top: 10px solid ${({ themeColors }) => themeColors.tertiary};
  border-bottom: 10px solid ${({ themeColors }) => themeColors.tertiary};

  animation: ${AnimationLoader} 1.5s ease-in-out infinite;
`;

const EditNote = ({ size, id, handleButtonClose }) => {
  const [loaded, setLoaded] = useState(true);
  const [idNote, setIdNote] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const [textAreaHeight, setTextAreaHeight] = useState(54);

  const themeColors = useContext(ThemeContext);

  const refTextArea = useRef(null);

  useEffect(() => {
    if (refTextArea.current !== null) {
      setTextAreaHeight(refTextArea.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    setLoaded(false);

    axios
      .get(process.env.REACT_APP_GET_SINGLE_NOTE_PATH, {
        params: {
          id,
        },
      })
      .then(function (response) {
        setIdNote(response.data.id);
        setNote(response.data.note);
        setDate(
          `${response.data.date[0]}-${response.data.date[1]}-${response.data.date[2]}`
        );
        setLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleTextArea = (e) => {
    setTextAreaHeight(e.target.scrollHeight);
    setNote(e.target.value);
  };

  const handleEditButton = () => {
    const dateYear = date.substr(0, 4);
    const dateMonth = date.substr(5, 2);
    const dateDay = date.substr(-2);

    const newTask = {
      note,
      id: idNote,
      date: [dateYear, dateMonth, dateDay],
    };

    axios.defaults.withCredentials = true;
    axios
      .post(process.env.REACT_APP_EDIT_NOTE_PATH, newTask)
      .then(function (response) {
        console.log(response);
        handleButtonClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Wrapper size={size} themeColors={themeColors}>
      {loaded === true ? (
        <>
          <StyledButton themeColors={themeColors} onClick={handleButtonClose}>
            +
          </StyledButton>
          <div>
            <StyledTextArea
              ref={refTextArea}
              themeColors={themeColors}
              type="text"
              value={note}
              onChange={handleTextArea}
              textAreaHeight={textAreaHeight}
            />

            <StyledInputDate
              type="date"
              themeColors={themeColors}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button onClick={handleEditButton}>Edytuj</button>
        </>
      ) : (
        <Loader themeColors={themeColors} />
      )}
    </Wrapper>
  );
};

export default EditNote;
