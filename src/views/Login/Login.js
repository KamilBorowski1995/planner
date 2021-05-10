import { useEffect, useState, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { ThemeContext } from "context/context";
import Input from "components/Input";
import Button from "components/Button";
import Auth from "Functions/Auth";

import Loader from "components/Loader";

import { reducerForm } from "reducers/reducerForm";
import { theme } from "theme/theme";

const Wrapper = styled.div`
  /* width: ${({ isDesktop }) => (isDesktop ? `400px` : "100vw")}; */
  height: ${({ viewH }) => `${viewH * 100}px`};
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
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

  display: flex;
  flex-direction: column;

  text-align: center;

  transition: 0.3s ease-in-out;
  transform: ${({ activePage }) =>
    activePage === "login"
      ? "translateX(0)"
      : "translateX(calc(-105% - 15px))"};
`;

const ContentRegisterWrapper = styled(ContentWrapper)`
  transform: ${({ activePage }) =>
    activePage === "register"
      ? "translateX(0%)"
      : "translateX(calc(105% + 15px))"};
`;

const Title = styled.h3`
  margin: 10vh 0 0;
  color: ${({ themeColors }) => themeColors.secondary};
  font-size: ${theme.size.xl};
  font-weight: 500;
`;
const ErrorInfo = styled.p`
  margin: 10px 0 30px;
  color: ${({ themeColors }) => themeColors.secondary};
  font-size: ${theme.size.m};
  font-weight: 500;
`;

const Form = styled.form`
  margin: 10vh 0 0;
  height: 30vh;
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

  const [loaded, setLoaded] = useState(true);
  const [errorText, setErrorText] = useState("");

  const [activePage, setActivePage] = useState("login");

  const themeColors = useContext(ThemeContext);

  const history = useHistory();

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    setViewH(vh);
  }, []);

  const handleLoginButton = () => {
    setErrorText("");
    setLoaded(false);
    dispatch({ type: "SET_VALUE", name: "name", value: "" });
    dispatch({ type: "SET_VALUE", name: "password", value: "" });
    axios.defaults.withCredentials = true;

    if (activePage === "login") {
      axios
        .post(process.env.REACT_APP_LOGIN_PATH, state)
        .then(function (response) {
          setLoaded(true);
          console.log(response);
          Auth.login(() => history.push("/"), response.data);
        })
        .catch(function (error, res) {
          setLoaded(true);
          setErrorText(error.response.data);
        });
    }
    if (activePage === "register") {
      axios
        .post(process.env.REACT_APP_REGISTER_PATH, state)
        .then(function (response) {
          setLoaded(true);
          console.log(response);
          history.push("/");
          setActivePage("login");
        })
        .catch(function (error, res) {
          setLoaded(true);
          setErrorText(error.response.data);
        });
    }
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
      {loaded ? (
        <>
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
            {errorText !== "" && (
              <ErrorInfo themeColors={themeColors}>{errorText}</ErrorInfo>
            )}

            <StyledButton themeColors={themeColors} onClick={hadleActivePage}>
              Nie masz konta? Zarejestruj się!
            </StyledButton>
          </ContentWrapper>
          <ContentRegisterWrapper
            themeColors={themeColors}
            activePage={activePage}
          >
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
              <Button onClick={handleLoginButton}>
                {activePage === "login" ? "Zaloguj" : "Zarejestruj"}
              </Button>
            </Form>

            <StyledButton themeColors={themeColors} onClick={hadleActivePage}>
              Masz konto? Zaloguj się!
            </StyledButton>
          </ContentRegisterWrapper>
        </>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
}

export default Login;
