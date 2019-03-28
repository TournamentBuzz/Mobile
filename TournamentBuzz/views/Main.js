import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, BottomNavigation, Badge } from "react-native-paper";
import { CSComponent } from "react-central-state";

import Container from "../components/Container";
import TournamentList from "../components/TournamentList";
import Account from "../components/Account";
import Home from "../components/Home";

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    bottom: 30,
    right: 5
  }
});

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
    this._onNotifications = this._onNotifications.bind(this);
  }

  updateWith() {
    return ["loggedIn"];
  }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: () => <Home navigation={this.props.navigation} />,
    explore: () => <TournamentList navigation={this.props.navigation} />,
    account: () => <Account />
  });

  _onNotifications() {
    this.props.navigation.navigate("Notifications");
  }

  render() {
    return (
      <Container>
        <View>
          <Appbar.Header>
            <Appbar.Content title="TournamentBuzz" />
            {this.centralState.loggedIn ? (
              <Appbar.Action
                icon="notifications"
                onPress={this._onNotifications}
              /> /* <Badge style={styles.badge}>2</Badge> */
            ) : null}
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

export default CSComponent(Main);
