import { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;

  font-family: ${theme.font.secondary};
  font-size: ${theme.size.l};
  color: ${({ themeColors }) => themeColors.secondary};
  background-color: transparent;
  border: 1px solid ${({ themeColors }) => themeColors.tertiary};
  border-radius: 10px;
`;

function Button({ children, className, onClick }) {
  const themeColors = useContext(ThemeContext);
  return (
    <StyledButton
      onClick={onClick}
      className={className}
      themeColors={themeColors}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
