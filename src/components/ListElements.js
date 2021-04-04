import styled from "styled-components";

import { theme } from "theme/theme";

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
  border-bottom: 1.5px solid ${theme.colors.dark.tertiary};
`;

const StyledElementTitle = styled.p`
  font-size: ${theme.size.s};
  color: ${theme.colors.dark.tertiary};
`;

const StyledButtonsList = styled.div``;

function ListElements({ dataBase }) {
  const MapElementsList = dataBase.elements.map(
    ({ id, title, date, color }) => (
      <StyledElement key={id}>
        <StyledColorList color={color}></StyledColorList>

        <StyledWrapperTitleAndButtons>
          <StyledElementTitle>{title}</StyledElementTitle>
          <StyledButtonsList>
            <div className="edit">add</div>
            <div className="delete">del</div>
          </StyledButtonsList>
        </StyledWrapperTitleAndButtons>
      </StyledElement>
    )
  );

  return <Wrapper>{MapElementsList}</Wrapper>;
}

export default ListElements;
