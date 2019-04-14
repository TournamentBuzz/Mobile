import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Title, ActivityIndicator } from "react-native-paper";

import Container from "../components/Container";
import NotificationList from "../components/NotificationList";
import { Analytics, PageHit } from "expo-analytics";

class Notifications extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };

  componentDidMount() {
    const analytics = new Analytics("UA-138304149-1");
    analytics.hit(new PageHit("Notifications"));
  }

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
