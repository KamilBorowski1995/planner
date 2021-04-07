import { useContext, useEffect } from "react";
import styled from "styled-components";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import { ReactComponent as IconTrash } from "assets/svg/icon-trash.svg";

const Wrapper = styled.div`
  /* max-height: 50vh; */
  overflow: scroll;
`;

const StyledElement = styled.div`
  display: grid;
  grid-template-columns: 7% 1fr;
  align-items: center;
  padding-bottom: 10px;
`;

const StyledColorList = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
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
  color: ${({ themeColors }) => themeColors.tertiary};
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
  }
`;

function ListElements({ dataBase }) {
  const themeColors = useContext(ThemeContext);

  const getDate = (time) => {
    const date = new Date(time);
    const getDates = date.toDateString();
    return getDates;
  };

  const MapElementsList = dataBase.elements.map(({ id, title, color }) => (
    <StyledElement key={id}>
      <StyledColorList color={color}></StyledColorList>

      <StyledWrapperTitleAndButtons themeColors={themeColors}>
        <StyledElementTitle themeColors={themeColors}>
          {title}
        </StyledElementTitle>
        <StyledButtonsList>
          <StyledSvgTrash themecolors={themeColors} />
        </StyledButtonsList>
      </StyledWrapperTitleAndButtons>
    </StyledElement>
  ));

  return <Wrapper>{MapElementsList}</Wrapper>;
}

export default ListElements;
