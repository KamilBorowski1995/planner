import { useEffect, useState, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { ThemeContext } from "context/context";
import Input from "components/Input";
import Button from "components/Button";
import Auth from "Functions/Auth";

import { reducerForm } from "reducers/reducerForm";
import { theme } from "theme/theme";

const Wrapper = styled.div`
  width: 100vw;
  height: ${({ viewH }) => `${viewH * 100}px`};

  background-color: ${({ themeColors }) => themeColors.primary};
  color: ${({ themeColors }) => themeColors.secondary};
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  height: calc(100% - 30px);
  width: calc(100% - 30px);
  box-shadow: 0 0 8px 1px ${({ themeColors }) => themeColors.shadow};
  border-radius: 20px;
  padding: 20px;

  position: absolute;
  top: 15px;
  left: 15px;

  /* display: grid;
  grid-template-columns: 100%;
  grid-template-rows: max-content max-content max-content; */

  display: flex;
  flex-direction: column;

  text-align: center;

  transition: 0.3s ease-in-out;
  transform: ${({ activePage }) =>
    activePage === "login"
      ? "translateX(0)"
      : "translateX(calc(-100% - 15px))"};
`;

const ContentRegisterWrapper = styled(ContentWrapper)`
  transform: ${({ activePage }) =>
    activePage === "register"
      ? "translateX(0%)"
      : "translateX(calc(100% + 15px))"};
`;

const Title = styled.h3`
  margin: 20% 0 20%;
  color: ${({ themeColors }) => themeColors.secondary};
  font-size: ${theme.size.xl};
  font-weight: 500;
`;

const Form = styled.form`
  margin: 10% 0 10%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledButton = styled.span`
  color: ${({ themeColors }) => themeColors.tertiary};
  font-size: ${theme.size.m};
  font-weight: 500;
`;

function Login() {
  const [viewH, setViewH] = useState(0);
  const [state, dispatch] = useReducer(reducerForm, {
    name: "",
    password: "",
  });

  const [activePage, setActivePage] = useState("login");

  const themeColors = useContext(ThemeContext);

  const history = useHistory();

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    setViewH(vh);

    console.log(vh);
  }, []);

  const handleLoginButton = () => {
    axios.defaults.withCredentials = true;
    axios
      .post(process.env.REACT_APP_LOGIN_PATH, state)
      .then(function (response) {
        console.log(response);
        Auth.login(() => history.push("/"));
      })
      .catch(function (error, res) {
        console.log(error);
      });
  };

  const hadleActivePage = () => {
    if (activePage === "login") {
      setActivePage("register");
    }
    if (activePage === "register") {
      setActivePage("login");
    }
  };

  return (
    <Wrapper viewH={viewH} themeColors={themeColors}>
      <ContentWrapper themeColors={themeColors} activePage={activePage}>
        <Title themeColors={themeColors}>Zaloguj się</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            dispatch={dispatch}
            state={state.name}
            name="Nazwa użytkownika"
            type="text"
          />
          <Input
            dispatch={dispatch}
            state={state.password}
            name="Hasło"
            type="password"
          />
          <Button onClick={handleLoginButton}>Zaloguj</Button>
        </Form>

        {/* 
        ------------------------
        ## Funkcja do dodania ## 
        ------------------------

        <a href="#" style={{ color: "white", display: "flex" }}>
          Nie pamiętasz hasła?
        </a> */}

        <StyledButton themeColors={themeColors} onClick={hadleActivePage}>
          Nie masz konta? Zarejestruj się!
        </StyledButton>
      </ContentWrapper>
      <ContentRegisterWrapper themeColors={themeColors} activePage={activePage}>
        <Title themeColors={themeColors}>Zarejestruj się</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            dispatch={dispatch}
            state={state.name}
            name="Nazwa użytkownika"
            type="text"
          />
          <Input
            dispatch={dispatch}
            state={state.password}
            name="Hasło"
            type="password"
          />
          <Button onClick={handleLoginButton}>Zaloguj</Button>
        </Form>

        {/* 
        ------------------------
        ## Funkcja do dodania ## 
        ------------------------

        <a href="#" style={{ color: "white", display: "flex" }}>
          Nie pamiętasz hasła?
        </a> */}

        <StyledButton themeColors={themeColors} onClick={hadleActivePage}>
          Masz konto? Zaloguj się!
        </StyledButton>
      </ContentRegisterWrapper>
    </Wrapper>
  );
}

export default Login;
