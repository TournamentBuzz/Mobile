import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import { CSComponent } from "react-central-state";

import Authentication from "../API/Authentication";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  updateWith() {
    return ["loggedIn"];
  }

  async componentDidMount() {
    if (this.centralState.loggedIn === undefined) {
      if (await Authentication.loggedIn()) {
        this.setCentralState({ loggedIn: true });
      } else {
        this.setCentralState({ loggedIn: false });
      }
    }
  }

  render() {
    return (
      <View style={styles.view}>
        {this.centralState.loggedIn ? (
          <Title>You are not signed up for any tournaments</Title>
        ) : (
          <Title>Login in to view your tournaments</Title>
        )}
      </View>
    );
  }
}

export default CSComponent(Home);
