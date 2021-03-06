import { useEffect, useState, useRef, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

import { ThemeContext } from "context/context";

import { ReactComponent as IconList } from "assets/svg/icon-list.svg";
import { ReactComponent as IconCalendar } from "assets/svg/icon-calendar.svg";

const Wrapper = styled.div`
  width: 100vw;
  height: ${({ viewH }) => `${viewH * 100}px`};
  padding: 15px 15px 5px;

  max-width: 500px;
  margin: 0 auto;

  background-color: ${({ themeColors }) => themeColors.primary};
  color: ${({ themeColors }) => themeColors.secondary};
  display: flex;
  flex-direction: column;
`;
const ContentWrapper = styled.div`
  flex-grow: 1;
  box-shadow: 0 0 8px 1px ${({ themeColors }) => themeColors.shadow};
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
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
    fill: ${({ active, themecolors }) =>
      active === "" ? themecolors.secondary : themecolors.tertiary};
  }

  :hover {
    transform: scale(1.05);
  }
`;
const StyledSvgCalendar = styled(IconCalendar)`
  transition: 0.2s ease-in-out;

  path {
    fill: ${({ active, themecolors }) =>
      active === "calendar" ? themecolors.secondary : themecolors.tertiary};
  }

  :hover {
    transform: scale(1.05);
  }
`;

function MobileTemplate({ children, setHeight }) {
  const [viewH, setViewH] = useState(0);
  const [activeView, setActiveView] = useState("list");

  const themeColors = useContext(ThemeContext);

  const location = useLocation();

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    setViewH(vh);
  }, []);

  useEffect(() => {
    setHeight(IconWrapperRef.current.clientHeight);
  });

  useEffect(() => {
    const path = location.pathname.slice(1);
    setActiveView(path);
  }, [location.pathname]);

  const IconWrapperRef = useRef(null);

  return (
    <Wrapper viewH={viewH} themeColors={themeColors}>
      <ContentWrapper themeColors={themeColors}>{children}</ContentWrapper>
      <IconWrapper ref={IconWrapperRef}>
        <StyledList>
          <li>
            <NavLink to="/">
              <StyledSvgList active={activeView} themecolors={themeColors} />
            </NavLink>
          </li>
        </StyledList>
        <StyledList>
          <li>
            <NavLink to="/calendar">
              <StyledSvgCalendar
                active={activeView}
                themecolors={themeColors}
              />
            </NavLink>
          </li>
        </StyledList>
      </IconWrapper>
    </Wrapper>
  );
}

export default MobileTemplate;
