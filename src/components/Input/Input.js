import { useState, useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import { ReactComponent as IconKey } from "assets/svg/icon-key.svg";
import { ReactComponent as IconUser } from "assets/svg/icon-user.svg";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
`;

const StyledSvgKey = styled(IconKey)`
  fill: red;
`;
const StyledSvgUser = styled(IconUser)`
  fill: red;
`;

const StyledInput = styled.input`
  margin-left: 3px;
  font-family: ${theme.font.secondary};
  font-size: ${theme.size.m};
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ themeColors }) => themeColors.secondary};
  color: ${({ themeColors }) => themeColors.secondary};

  ::placeholder {
    color: ${({ themeColors }) => themeColors.tertiary};
  }
`;

const StyledShowPass = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ themeColors }) => themeColors.tertiary};
  transition: 0.2s ease-in-out;
  cursor: pointer;

  :hover {
    color: ${({ themeColors }) => themeColors.secondary};
  }
`;

function Input({ name, type, state, dispatch }) {
  const [showPass, setShowPass] = useState(false);

  const handleInput = (e) => {
    dispatch({ type: "SET_VALUE", name: e.target.name, value: e.target.value });
  };

  const themeColors = useContext(ThemeContext);
  return (
    <Wrapper>
      {name === "Nazwa użytkownika" && <StyledSvgUser />}
      {name === "Hasło" && <StyledSvgKey />}
      {type === "text" ? (
        <StyledInput
          type="text"
          value={state}
          onChange={handleInput}
          placeholder={name}
          themeColors={themeColors}
          name="name"
        />
      ) : (
        <StyledInput
          type={showPass ? "text" : "password"}
          value={state}
          onChange={handleInput}
          placeholder={name}
          themeColors={themeColors}
          name="password"
        />
      )}
      {type === "password" && (
        <StyledShowPass
          onClick={(e) => {
            e.preventDefault();
            setShowPass((prev) => !prev);
          }}
          themeColors={themeColors}
        >
          Pokaż
        </StyledShowPass>
      )}
    </Wrapper>
  );
}

export default Input;
