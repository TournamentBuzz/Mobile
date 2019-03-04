import React, { Component } from "react";
import { View, Text } from "react-native";
import { Appbar, BottomNavigation } from "react-native-paper";

import Container from "../components/Container";
import TournamentList from "../components/TournamentList";
import Account from "../components/Account";
import Home from "../components/Home";

// const HomeRoute = () => <Text>Home</Text>;

// const ExploreRoute = () => <TournamentList />;

// const AccountRoute = () => <Account />;

class Main extends Component {
  static navigationOptions = { header: null };
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
    home: () => <Home />,
    explore: () => <TournamentList navigation={this.props.navigation} />,
    account: () => <Account />
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
