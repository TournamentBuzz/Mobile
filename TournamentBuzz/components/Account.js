import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Title,
  TextInput,
  Portal,
  Modal,
  Text
} from "react-native-paper";
import { CSComponent } from "react-central-state";

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
      notificationsList: null,
      feedbackText: "",
      sending: false,
      submittedText: ""
    };
    this.googleLogin = this.googleLogin.bind(this);
  }

  updateWith() {
    return ["loggedIn"];
  }

  async googleLogin() {
    this.setCentralState({ loggedIn: null });
    try {
      await Authentication.login();
      this.setCentralState({ loggedIn: true });
    } catch (e) {
      console.log("User cancelled signin");
      this.setCentralState({ loggedIn: false });
    }
  }

  async signOut() {
    await Authentication.logout();
    this.setCentralState({ loggedIn: false });
    this.setState({ submittedText: "" });
  }

  async submitFeedback() {
    this.setState({ sending: true, submittedText: "" });
    var sendDelay = Math.floor(Math.random() * 1301) + 700;
    await new Promise(resolve => setTimeout(resolve, sendDelay));
    this.setState({
      sending: false,
      submittedText: "Feedback sent!",
      feedbackText: ""
    });
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
        <Portal>
          <View style={loginStyles.view}>
            <Modal visible={this.state.sending} dismissable={false}>
              <ActivityIndicator animating={true} />
            </Modal>
          </View>
        </Portal>
        {this.centralState.loggedIn === null ? (
          <View style={loginStyles.view}>
            <ActivityIndicator animating={true} />
          </View>
        ) : this.centralState.loggedIn === true ? (
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Title>{"My Account"}</Title>
            <Button onPress={this.signOut.bind(this)}>Sign Out</Button>
            <View>
              <Title>App Feedback</Title>
              <Text style={{ color: "#35bf4e" }}>
                {this.state.submittedText}
              </Text>
              <TextInput
                placeholder="Enter your feedback here"
                multiline={true}
                numberOfLines={5}
                value={this.state.feedbackText}
                onChangeText={feedbackText =>
                  this.setState({
                    feedbackText: feedbackText
                  })
                }
              />
              <Button onPress={this.submitFeedback.bind(this)}>
                Submit Feedback
              </Button>
            </View>
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

export default CSComponent(Account);
