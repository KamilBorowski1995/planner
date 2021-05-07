import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import { ReactComponent as IconTrash } from "assets/svg/icon-trash.svg";

const Wrapper = styled.div`
  /* max-height: 50vh; */
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledElement = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding-bottom: 10px;
`;

const StyledWrapperTitleAndButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 10%;
  align-items: center;
  padding: 5px;
  border-bottom: 1.5px solid ${({ themeColors }) => themeColors.tertiary};
`;

const StyledElementTitle = styled.p`
  font-size: ${theme.size.s};
  color: ${({ themeColors }) => themeColors.secondary};
`;

const StyledButtonsList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSvgTrash = styled(IconTrash)`
  transition: 0.2s ease-in-out;
  margin-right: 5px;
  path {
    fill: ${({ themecolors }) => themecolors.tertiary};
  }

  :hover {
    transform: scale(1.05);
    fill: ${({ themecolors }) => themecolors.secondary};
  }
`;

function ListElements({ dataBase }) {
  const [notes, setNotes] = useState([]);
  const themeColors = useContext(ThemeContext);

  useEffect(() => {
    setNotes(dataBase);
  }, [dataBase]);

  const deleteNote = (e, id) => {
    axios
      .delete(process.env.REACT_APP_DELETE_NOTE_PATH, { data: { id } })
      .then(function (response) {
        setNotes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const MapElementsList = notes.map(({ id, note }) => (
    <StyledElement key={id}>
      <StyledWrapperTitleAndButtons themeColors={themeColors}>
        <StyledElementTitle themeColors={themeColors}>
          {note}
        </StyledElementTitle>
        <StyledButtonsList>
          <StyledSvgTrash
            themecolors={themeColors}
            onClick={(e) => deleteNote(e, id)}
          />
        </StyledButtonsList>
      </StyledWrapperTitleAndButtons>
    </StyledElement>
  ));

  return <Wrapper>{MapElementsList}</Wrapper>;
}

export default ListElements;
