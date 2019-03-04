import React, { Component } from "react";
import { Card, Title } from "react-native-paper";

class TeamCard extends Component {
  handlePress(id, navigation) {
    navigation.navigate("TeamDetails", {
      teamId: id
    });
  }

  render() {
    const { id, teamName, navigation } = this.props;
    return (
      <Card onPress={() => this.handlePress(id, navigation)}>
        <Card.Content>
          <Title>{teamName}</Title>
        </Card.Content>
      </Card>
    );
  }
}

export default TeamCard;
