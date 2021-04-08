import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ThemeContext } from "context/context";
import Input from "components/Input";
import Button from "components/Button";
import Auth from "Functions/Auth";

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

  const themeColors = useContext(ThemeContext);

  const history = useHistory();

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    setViewH(vh);
  }, []);

  const handleButtonLogin = () => {
    Auth.login(() => history.push("/"));
  };

  return (
    <Wrapper viewH={viewH} themeColors={themeColors}>
      <ContentWrapper themeColors={themeColors}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input name="Nazwa użytkownika" type="text" />
          <Input name="Hasło" type="password" />
          <Button onClick={handleButtonLogin}>Zaloguj</Button>
        </form>

        {/* 
        ------------------------
        ## Funkcja do dodania ## 
        ------------------------

        <a href="#" style={{ color: "white", display: "flex" }}>
          Nie pamiętasz hasła?
        </a> */}

        <a href="#" style={{ color: "white", display: "flex" }}>
          Nie masz konta? Zarejestruj się!
        </a>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Login;
