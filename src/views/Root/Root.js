import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import List from "views/List";
import Calendar from "views/Calendar";

import Login from "views/Login";

import "./Root.css";
import ProtectedRoute from "Functions/ProtectedRoute";

const AppWrapper = styled.div`
  background-color: ${({ themeColors }) => themeColors.primary};
`;

function Root() {
  const [themeColors, setThemeColors] = useState(theme.colors.dark);

  useEffect(() => {
    setThemeColors(theme.colors.dark);
  }, []);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={themeColors}>
        <AppWrapper themeColors={themeColors}>
          <Switch>
            <ProtectedRoute exact path="/" component={List} />
            <ProtectedRoute exact path="/calendar" component={Calendar} />

            <Route path="/login" component={Login} />

            <ProtectedRoute exact path="*" component={List} />
          </Switch>
        </AppWrapper>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default Root;
