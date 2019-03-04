import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import GoogleAuth from "../API/GoogleAuth";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
    this.googleLogin = this.googleLogin.bind(this);
  }

  async googleLogin() {
    const result = await GoogleAuth.signInAsync();
  }

  render() {
    return (
      <View style={styles.view}>
        <Button mode="contained" onPress={this.googleLogin} color="#4285F4">
          Sign in with Google
        </Button>
      </View>
    );
  }
}

export default Login;
