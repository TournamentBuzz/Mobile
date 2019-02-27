import React, { Component } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Title, Text } from "react-native-paper";

import Container from "../components/Container";


class Account extends Component {
    constructor(props) {
      super(props);
      this.state = {
        notificationsList: null
      };
    }

    // async createNotificationsList() {
    //   // query api and get notifications
    // }

    render() {
        return (
          <Container>
            <Title>{"My Account: " + "test@test.com"}</Title>
            {this.state.notificationsList === null ? (
              <View>
                <Text>{"Notifications"}</Text>
                <ActivityIndicator animating={true} />
                <Button
                    onPress={() => console.log("Sign Out")}>
                    Sign Out
                </Button>  
              </View>
            ) : (
              <View>
              <Text>{"Notifications"}</Text>
              {this.state.notificationsList}
              <Button
                    onPress={() => console.log("Sign Out")}>
                    Sign Out
              </Button>      
              </View>  
            )}
          </Container>
        );
      }
}

export default Account;