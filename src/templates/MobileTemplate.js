import { useEffect, useState } from "react";
import styled from "styled-components";

import { theme } from "theme/theme";

import { ReactComponent as IconList } from "assets/svg/icon-list.svg";
import { ReactComponent as IconCalendar } from "assets/svg/icon-calendar.svg";

const Wrapper = styled.div`
  width: 100vw;
  height: ${({ viewH }) => `${viewH * 100}px`};
  padding: 5px;

  background-color: ${theme.colors.dark.primary};
  color: ${theme.colors.dark.secondary};

  display: flex;
  flex-direction: column;
`;
const ContentWrapper = styled.div`
  flex-grow: 1;
  box-shadow: 0 0 8px 1px ${theme.colors.dark.shadow};
  border-radius: 40px;
`;
const IconWrapper = styled.div`
  flex-basis: 70px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledSvgList = styled(IconList)`
  transition: 0.2s ease-in-out;

  path {
    fill: ${({ active }) =>
      active ? theme.colors.dark.secondary : theme.colors.dark.tertiary};
  }

  :hover {
    transform: scale(1.05);
  }
`;
const StyledSvgCalendar = styled(IconCalendar)`
  transition: 0.2s ease-in-out;

  path {
    fill: ${({ active }) =>
      active ? theme.colors.dark.secondary : theme.colors.dark.tertiary};
  }

  :hover {
    transform: scale(1.05);
  }
`;

function MobileTemplate({ children }) {
  const [viewH, setViewH] = useState(0);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    setViewH(vh);
  }, []);

  return (
    <Wrapper viewH={viewH}>
      <ContentWrapper>{children}</ContentWrapper>
      <IconWrapper>
        <StyledSvgList active={true} />
        <StyledSvgCalendar />
      </IconWrapper>
    </Wrapper>
  );
}

export default MobileTemplate;
