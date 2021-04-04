import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { theme } from "theme/theme";

import { ReactComponent as IconList } from "assets/svg/icon-list.svg";
import { ReactComponent as IconCalendar } from "assets/svg/icon-calendar.svg";

const Wrapper = styled.div`
  width: 100vw;
  height: ${({ viewH }) => `${viewH * 100}px`};
  padding: 15px 15px 5px;

  background-color: ${theme.colors.dark.primary};
  color: ${theme.colors.dark.secondary};

  display: flex;
  flex-direction: column;
`;
const ContentWrapper = styled.div`
  flex-grow: 1;
  box-shadow: 0 0 8px 1px ${theme.colors.dark.shadow};
  border-radius: 20px;
  overflow: hidden;
`;
const IconWrapper = styled.nav`
  flex-basis: 100px;

  /* padding: 20px 0; */

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledList = styled.ul`
  list-style: none;
`;

const StyledSvgList = styled(IconList)`
  transition: 0.2s ease-in-out;

  path {
    fill: ${({ active }) =>
      active === "list"
        ? theme.colors.dark.secondary
        : theme.colors.dark.tertiary};
  }

  :hover {
    transform: scale(1.05);
  }
`;
const StyledSvgCalendar = styled(IconCalendar)`
  transition: 0.2s ease-in-out;

  path {
    fill: ${({ active }) =>
      active === "calendar"
        ? theme.colors.dark.secondary
        : theme.colors.dark.tertiary};
  }

  :hover {
    transform: scale(1.05);
  }
`;

function MobileTemplate({ children, setHeight }) {
  const [viewH, setViewH] = useState(0);
  const [activeView, setActiveView] = useState("list");

  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    setViewH(vh);

    //
  }, []);

  useEffect(() => {
    setHeight(IconWrapperRef.current.clientHeight);
  });

  const IconWrapperRef = useRef(null);

  return (
    <Wrapper viewH={viewH}>
      <ContentWrapper>{children}</ContentWrapper>
      <IconWrapper ref={IconWrapperRef}>
        <StyledList>
          <li>
            <StyledSvgList active={activeView} />
          </li>
        </StyledList>
        <StyledList>
          <li>
            <StyledSvgCalendar active={activeView} />
          </li>
        </StyledList>
      </IconWrapper>
    </Wrapper>
  );
}

export default MobileTemplate;
