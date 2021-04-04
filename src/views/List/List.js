import { useState, useEffect } from "react";
import styled from "styled-components";

import MobileTemplate from "templates/MobileTemplate";
import { theme } from "theme/theme";

import ListElements from "components/ListElements";

const dataBase = {
  name: "Zadania",
  elements: [
    {
      id: 1,
      title: "Zadanie numer 1",
      date: "2 stycznia 1002",
      color: "red",
    },
    {
      id: 2,
      title: "A to jest kolejne zadanie",
      date: "19 stycznia 1002",
      color: "royalblue",
    },
    {
      id: 3,
      title: "Zadanie numer 1",
      date: "2 stycznia 1002",
      color: "red",
    },
    {
      id: 33,
      title: "A to jest kolejne zadanie",
      date: "19 stycznia 1002",
      color: "royalblue",
    },
    {
      id: 4,
      title: "Zadanie numer 1",
      date: "2 stycznia 1002",
      color: "red",
    },
    {
      id: 5,
      title: "A to jest kolejne zadanie",
      date: "19 stycznia 1002",
      color: "royalblue",
    },
    {
      id: 6,
      title: "Zadanie numer 1",
      date: "2 stycznia 1002",
      color: "red",
    },
    {
      id: 7,
      title: "A to jest kolejne zadanie",
      date: "19 stycznia 1002",
      color: "royalblue",
    },
    {
      id: 8,
      title: "Zadanie numer 1",
      date: "2 stycznia 1002",
      color: "red",
    },
    {
      id: 9,
      title: "A to jest kolejne zadanie",
      date: "19 stycznia 1002",
      color: "royalblue",
    },
    {
      id: 12,
      title: "Zadanie numer 1",
      date: "2 stycznia 1002",
      color: "red",
    },
    {
      id: 752,
      title: "A to jest kolejne zadanie",
      date: "19 stycznia 1002",
      color: "royalblue",
    },
    {
      id: 1326,
      title: "Zadanie numer 1",
      date: "2 stycznia 1002",
      color: "red",
    },
    {
      id: 234263426,
      title: "A to jest kolejne zadanie",
      date: "19 stycznia 1002",
      color: "green",
    },
    {
      id: 12322434,
      title: "Zadanie przed ostatnie",
      date: "2 stycznia 1002",
      color: "yellow",
    },
    {
      id: 75226626,
      title: "Ostatnie zadanie!!",
      date: "19 stycznia 1002",
      color: "darkred",
    },
  ],
};

const WrapperElements = styled.div`
  padding: 20px;

  max-height: ${({ size }) => `${size}px`};

  display: flex;
  flex-direction: column;

  font-family: ${theme.font.secondary};
`;

const StyledTitle = styled.h2`
  margin-bottom: 20px;
  color: ${theme.colors.dark.secondary};
  font-size: ${theme.size.xl};
  font-weight: 500;
`;

const WrapperInput = styled.div`
  display: grid;
  grid-template-columns: 85% 1fr;
  font-family: ${theme.font.secondary};

  margin-bottom: 30px;
`;

const StyledInput = styled.input`
  border: 1px solid ${theme.colors.dark.tertiary};
  border-radius: 10px;
  padding: 10px 15px;
  background-color: transparent;
  color: ${theme.colors.dark.secondary};
  font-size: ${theme.size.m};

  ::placeholder {
    font-family: ${theme.font.secondary};
    letter-spacing: 1px;
    color: ${theme.colors.dark.tertiary};
    font-size: ${theme.size.s};
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  color: ${({ color }) =>
    color === "dark"
      ? `${theme.colors.dark.tertiary}`
      : `${theme.colors.dark.secondary}`};
  /* color: ${theme.colors.dark.tertiary}; */
  font-size: ${theme.size.xl};
  border: none;
`;

function List() {
  const [heightWrapperNav, setHeightWrapperNav] = useState(50);
  const [size, setSize] = useState(150);

  useEffect(() => {
    const heightSite = document.body.clientHeight;
    setSize(heightSite - heightWrapperNav);
  });

  const setHeight = (height) => setHeightWrapperNav(height);

  return (
    <MobileTemplate setHeight={setHeight}>
      <WrapperElements size={size}>
        <StyledTitle>{dataBase.name}</StyledTitle>

        <WrapperInput>
          <StyledInput type="text" placeholder="Dodaj nowe zadanie..." />
          <StyledButton color="dark">+</StyledButton>
        </WrapperInput>

        <ListElements dataBase={dataBase} />
      </WrapperElements>
    </MobileTemplate>
  );
}

export default List;
