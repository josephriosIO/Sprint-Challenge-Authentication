import React from "react";
import "./App.css";
import { NavLink, Route, withRouter } from "react-router-dom";

import Login from "./components/auth/Login";
import DadJokes from "./components/app/DadJokes";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/private/PrivateRoutes";

function App(props) {
  function logout() {
    localStorage.removeItem("jwt");
    props.history.push("/login");
  }
  return (
    <div className="App">
      <nav>
        {!localStorage.getItem("jwt") ? (
          <NavLink to="/login">Login</NavLink>
        ) : null}
        {localStorage.getItem("jwt") ? (
          <NavLink to="jokes">Dad Jokes</NavLink>
        ) : null}
        {localStorage.getItem("jwt") ? (
          <button onClick={logout}>logout</button>
        ) : null}
      </nav>
      <main>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/jokes" component={DadJokes} />
      </main>
    </div>
  );
}

export default withRouter(App);
