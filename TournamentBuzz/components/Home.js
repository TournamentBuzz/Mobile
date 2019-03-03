import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

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
  }

  render() {
    return (
      <View style={styles.view}>
        <Title>You are not signed up for any tournaments</Title>
      </View>
    );
  }
}

export default Login;
