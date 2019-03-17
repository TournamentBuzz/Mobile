import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Title, ActivityIndicator } from "react-native-paper";

import Container from "../components/Container";
import NotificationList from "../components/NotificationList";

class Notifications extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };

  render() {
    return (
      <Container>
        <ScrollView>
          <NotificationList />
        </ScrollView>
      </Container>
    );
  }
}

export default Notifications;
