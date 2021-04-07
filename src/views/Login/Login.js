import { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "context/context";

const Wrapper = styled.div`
  width: 100vw;
  height: ${({ viewH }) => `${viewH * 100}px`};
  padding: 15px;

  background-color: ${({ themeColors }) => themeColors.primary};
  color: ${({ themeColors }) => themeColors.secondary};
`;

const ContentWrapper = styled.div`
  height: 100%;
  box-shadow: 0 0 8px 1px ${({ themeColors }) => themeColors.shadow};
  border-radius: 20px;
  padding: 20px;
`;

const WrapperInput = styled.div``;

function Login() {
  const [viewH, setViewH] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [showPass, setShowPass] = useState(false);

  const themeColors = useContext(ThemeContext);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    setViewH(vh);
  }, []);

  return (
    <Wrapper viewH={viewH} themeColors={themeColors}>
      <ContentWrapper themeColors={themeColors}>
        <form onSubmit={(e) => e.preventDefault()}>
          <WrapperInput>
            <img src="" alt="" />
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              placeholder="Nazwa użytkownika"
            />
          </WrapperInput>
          <WrapperInput>
            <img src="" alt="" />
            <input
              type={showPass ? "text" : "password"}
              value={passValue}
              onChange={(e) => setPassValue(e.target.value)}
              placeholder="Hasło"
            />
            <span
              onClick={(e) => {
                e.preventDefault();
                setShowPass((prev) => !prev);
              }}
            >
              Pokaż
            </span>
          </WrapperInput>
          <button>Zaloguj</button>
        </form>

        <a href="#" style={{ color: "white", display: "flex" }}>
          Nie pamiętasz hasła?
        </a>
        <a href="#" style={{ color: "white", display: "flex" }}>
          Nie masz konta? Zarejestruj się!
        </a>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Login;
