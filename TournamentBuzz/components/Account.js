import React, { Component } from "react";
import { View, AsyncStorage, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Title, Text } from "react-native-paper";

import Container from "../components/Container";
import GoogleAuth from "../API/GoogleAuth";
import Login from "./Login";

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
      loggedIn: false,
      notificationsList: null
    };
    this.googleLogin = this.googleLogin.bind(this);
  }

  // async createNotificationsList() {
  //   // query api and get notifications
  // }

  async googleLogin() {
    try {
      const result = await GoogleAuth.signInAsync();
      this.setState({ loggedIn: true });
    } catch (e) {
      console.log("User cancelled signin");
    }
  }

  async signOut() {
    const accountKey = JSON.parse(
      await AsyncStorage.getItem("@Tournamentbuzz:GoogleOAuthKey")
    );
    await GoogleAuth.signOutAsync(accountKey);
    this.setState({ loggedIn: false });
  }

  async componentDidMount() {
    try {
      const accountKey = await AsyncStorage.getItem(
        "@Tournamentbuzz:GoogleOAuthKey"
      );
      if (accountKey !== undefined && accountKey !== null) {
        this.setState({ loggedIn: true });
      }
    } catch (e) {
      console.log("Not logged in");
    }
  }

  render() {
    return (
      <Container>
        {this.state.loggedIn === true ? (
          <View>
            <Title>{"My Account"}</Title>
            {this.state.notificationsList === null ? (
              <View>
                <Text>{"Notifications"}</Text>
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
