import React, { Component } from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import TeamAPI from "../API/TeamAPI";

class NotificationCard extends Component {
  constructor(props) {
    super(props);

    this.declineInvite = this.declineInvite.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
  }

  async acceptInvite(id) {
    try {
      await TeamAPI.acceptInvite(id);
    } catch (error) {
      return;
    }
    // refresh notification list
  }

  async declineInvite(id) {
    try {
      await TeamAPI.declineInvite(id);
    } catch (error) {
      return;
    }
    // refresh notification list
  }

  render() {
    const { id, name } = this.props;
    return (
      <Card>
        <Card.Content>
          <Title>Team Invite</Title>
          <Paragraph>You have been invited to join {name}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => this.declineInvite(id)}>Decline</Button>
          <Button onPress={() => this.acceptInvite(id)}>Accept</Button>
        </Card.Actions>
      </Card>
    );
  }
}

export default NotificationCard;
