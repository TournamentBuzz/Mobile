import React, { Component } from "react";
import { View, Text } from "react-native";
import { Appbar, BottomNavigation } from "react-native-paper";

import Container from "../components/Container";
import TournamentList from "../components/TournamentList";

const HomeRoute = () => <TournamentList />;

const ExploreRoute = () => <Text>Explore</Text>;

const AccountRoute = () => <Text>Account</Text>;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: "home", title: "Home", icon: "home" },
        { key: "explore", title: "Explore", icon: "explore" },
        { key: "account", title: "Account", icon: "person" }
      ]
    };
  }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    explore: ExploreRoute,
    account: AccountRoute
  });

  render() {
    return (
      <Container>
        <View>
          <Appbar.Header>
            <Appbar.Content title="TournamentBuzz" />
          </Appbar.Header>
        </View>
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </Container>
    );
  }
}

export default Main;
