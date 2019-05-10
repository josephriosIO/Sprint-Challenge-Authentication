import React, { Component } from "react";
import axios from "axios";

class DadJokes extends Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    const endpoint = "http://localhost:3300/api/jokes";
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };
    axios.get(endpoint, reqOptions).then(res => {
      this.setState({
        jokes: res.data
      });
    });
  }
  render() {
    return (
      <>
        <h2>list of jokes</h2>
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>{joke.joke}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default DadJokes;
