import React, { Component } from "react";
import { View } from "react-native";
import { ActivityIndicator, Title } from "react-native-paper";

import Container from "../components/Container";
import NotificationCard from "./NotificationCard";
import TeamAPI from "../API/TeamAPI.js";

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationList: null
    };
  }

  async createNotificationList() {
    let pendingInvites = undefined;
    try {
      pendingInvites = await TeamAPI.getPendingInvites();
    } catch (error) {
      let message = <Title>No Notifications</Title>;
      this.setState({ notificationList: message });
      return;
    }
    if (pendingInvites === undefined || pendingInvites.length < 1) {
      let message = <Title>No Notifications</Title>;
      this.setState({ notificationList: message });
      return;
    }
    let teamList = [];
    for (let invite of pendingInvites) {
      teamList.push(invite.teamId);
    }

    let list = [];
    for (let team of teamList) {
      let details = undefined;
      try {
        details = await TeamAPI.getTeam(team);
      } catch (error) {
        return;
      }
      if (details === undefined) {
        return;
      }
      if (details.length < 1) {
        return;
      }
      details = details[0];
      let card = (
        <NotificationCard key={team} id={team} name={details.teamName} />
      );
      list.push(card);
    }
    this.setState({ notificationList: list });
  }

  async componentDidMount() {
    await this.createNotificationList();
  }

  render() {
    return (
      <Container>
        {this.state.notificationList === null ? (
          <View>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View>{this.state.notificationList}</View>
        )}
      </Container>
    );
  }
}

export default NotificationList;
