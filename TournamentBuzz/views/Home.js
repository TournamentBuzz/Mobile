import React, { Component } from "react";
import { View, Text } from "react-native";
import Container from "../components/Container";

import { Toolbar, BottomNavigation, Icon } from "react-native-material-ui";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { active: "home" };
  }
  componentWillUpdate;
  render() {
    return (
      <Container>
        <View>
          <Toolbar centerElement="TournamentBuzz" />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>{this.state.active}</Text>
        </View>
        <BottomNavigation active={this.state.active}>
          <BottomNavigation.Action
            key="home"
            icon="home"
            label="Home"
            onPress={() => this.setState({ active: "home" })}
          />
          <BottomNavigation.Action
            key="explore"
            icon="explore"
            label="Explore"
            onPress={() => this.setState({ active: "explore" })}
          />
          <BottomNavigation.Action
            key="account"
            icon="person"
            label="Account"
            onPress={() => this.setState({ active: "account" })}
          />
        </BottomNavigation>
      </Container>
    );
  }
}

export default Main;
