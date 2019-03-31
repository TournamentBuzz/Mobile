import React, { Component } from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import TeamAPI from "../API/TeamAPI";

class NotificationCard extends Component {
  constructor(props) {
    super(props);

    this.declineInvite = this.declineInvite.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
  }

  async acceptInvite(id, refreshList) {
    try {
      await TeamAPI.acceptInvite(id);
    } catch (error) {
      return;
    }
    refreshList();
  }

  async declineInvite(id, refreshList) {
    try {
      await TeamAPI.declineInvite(id);
    } catch (error) {
      return;
    }
    refreshList();
  }

  render() {
    const { id, name, refreshList } = this.props;
    return (
      <Card>
        <Card.Content>
          <Title>Team Invite</Title>
          <Paragraph>You have been invited to join {name}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => this.declineInvite(id, refreshList)}>
            Decline
          </Button>
          <Button onPress={() => this.acceptInvite(id, refreshList)}>
            Accept
          </Button>
        </Card.Actions>
      </Card>
    );
  }
}

export default NotificationCard;
