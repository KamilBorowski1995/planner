import { useEffect, useState, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { ThemeContext } from "context/context";
import Input from "components/Input";
import Button from "components/Button";
import Auth from "Functions/Auth";

import { reducerForm } from "reducers/reducerForm";

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

function Login() {
  const [viewH, setViewH] = useState(0);
  const [state, dispatch] = useReducer(reducerForm, {
    name: "",
    password: "",
  });

  const themeColors = useContext(ThemeContext);

  const history = useHistory();

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    setViewH(vh);
  }, []);

  useEffect(() => {
    console.log(state);
  });

  const handleLoginButton = () => {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:5000/api/user/login", state)
      .then(function (response) {
        console.log(response);
        Auth.login(() => history.push("/"));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Wrapper viewH={viewH} themeColors={themeColors}>
      <ContentWrapper themeColors={themeColors}>
        <form onSubmit={(e) => e.preventDefault()}>
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
        </form>

        {/* 
        ------------------------
        ## Funkcja do dodania ## 
        ------------------------

        <a href="#" style={{ color: "white", display: "flex" }}>
          Nie pamiętasz hasła?
        </a> */}

        {/* <a href="#" style={{ color: "white", display: "flex" }}>
          Nie masz konta? Zarejestruj się!
        </a> */}
      </ContentWrapper>
    </Wrapper>
  );
}

export default Login;
