import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { TextInput, Button } from "react-native-paper";

import Authentication from "../API/Authentication";
import * as errors from "../API/errors";
import Container from "../components/Container";

class Login_Old extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      APIBusy: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin() {
    if (!this.state.APIBusy) {
      this.setState({ APIBusy: true });
      // do login stuff
      const email = this.state.email;
      const password = this.state.password;
      const res = await fetch(
        `https://tournamentbuzz.dennisli.dev/api/user/login`,
        {
          method: "POST",
          headers: Authentication.withoutJWT(),
          body: JSON.stringify({ email, password })
        }
      );

      if (res.status === 401) {
        // API returned unauthorized
        throw new errors.IncorrectLoginError();
      }
      if (!res.ok) {
        throw new errors.UnexpectedError();
      }
      const json = await res.json();
      const jwt = json.jwt;
      try {
        await AsyncStorage.setItem("userToken", jwt);
      } catch (e) {
        console.log(e);
      }
      const jwtFetch = await AsyncStorage.getItem("userToken");
      console.log(jwtFetch);
      this.setState({ APIBusy: false });
    }
  }

  render() {
    return (
      <Container>
        <TextInput
          label="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          label="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button mode="contained" onPress={this.handleLogin}>
          Login
        </Button>
      </Container>
    );
  }
}

export default Login_Old;
