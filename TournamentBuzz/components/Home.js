import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import { CSComponent } from "react-central-state";

import Authentication from "../API/Authentication";
import UserTournamentList from "./UserTournamentList";
import Container from "./Container";

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
      <Container>
        {this.centralState.loggedIn ? (
          <UserTournamentList navigation={this.props.navigation} />
        ) : (
          <View style={styles.view}>
            <Title>Login to view your tournaments</Title>
          </View>
        )}
      </Container>
    );
  }
}

export default CSComponent(Home);
