import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChanges = e => {
    const { value, id } = e.target;
    this.setState({
      [id]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const endpoint = "http://localhost:3300/api/register";

    axios
      .post(endpoint, this.state)
      .then(res => {
        this.props.history.push("/login");
      })
      .catch(err => console.error(err));

    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <>
        <h1>register form</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="username">
              <input
                placeholder="enter username..."
                type="text"
                name="username"
                id="username"
                onChange={this.handleChanges}
                value={this.state.username}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <input
                placeholder="enter password...."
                type="password"
                name="password"
                id="password"
                onChange={this.handleChanges}
                value={this.state.password}
              />
            </label>
          </div>
          <div>
            <button type="submit">register</button>
          </div>
        </form>
      </>
    );
  }
}

export default Register;
