import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Google } from "expo";

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
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "802305630809-8j93ohaaifcjl9obeq1r1a38irlmhr8a.apps.googleusercontent.com",
        iosClientId:
          "802305630809-0cv268h0586cnhn5lro0cf0f0hr1ldi8.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        this.setState({
          signedIn: true
        });
      } else {
        console.log("Sign In Canceled");
      }
    } catch (e) {
      console.log(e);
    }
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
