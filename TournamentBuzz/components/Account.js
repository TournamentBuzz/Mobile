import React, { Component } from "react";
import { View, AsyncStorage, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Title, Text } from "react-native-paper";

import Container from "../components/Container";
import Authentication from "../API/Authentication";

const loginStyles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      notificationsList: null
    };
    this.googleLogin = this.googleLogin.bind(this);
  }

  // async createNotificationsList() {
  //   // query api and get notifications
  // }

  async googleLogin() {
    this.setState({ loggedIn: null });
    try {
      await Authentication.login();
      this.setState({ loggedIn: true });
    } catch (e) {
      console.log("User cancelled signin");
      this.setState({ loggedIn: false });
    }
  }

  async signOut() {
    await Authentication.logout();
    this.setState({ loggedIn: false });
  }

  async componentDidMount() {
    if (await Authentication.loggedIn()) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    return (
      <Container>
        {this.state.loggedIn === null ? (
          <View style={loginStyles.view}>
            <ActivityIndicator animating={true} />
          </View>
        ) : this.state.loggedIn === true ? (
          <View style={{ marginLeft: 10 }}>
            <Title>{"My Account"}</Title>
            {this.state.notificationsList === null ? (
              <View>
                <Text style={{ fontWeight: "bold" }}>{"Notifications"}</Text>
                <Text>{"No notifications"}</Text>
                {/* <ActivityIndicator animating={true} /> */}
                <Button onPress={this.signOut.bind(this)}>Sign Out</Button>
              </View>
            ) : (
              <View>
                <Text>{"Notifications"}</Text>
                {this.state.notificationsList}
                <Button onPress={this.signOut.bind(this)}>Sign Out</Button>
              </View>
            )}
          </View>
        ) : (
          <View style={loginStyles.view}>
            <Button mode="contained" onPress={this.googleLogin} color="#4285F4">
              Sign in with Google
            </Button>
          </View>
        )}
      </Container>
    );
  }
}

export default Account;
