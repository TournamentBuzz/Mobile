import React, { Component } from "react";
import { Card, Title, Paragraph, Chip } from "react-native-paper";

class UserTournamentCard extends Component {
  handlePress(id, navigation) {
    navigation.navigate("TournamentDetails", {
      tournamentId: id
    });
  }

  render() {
    const { id, name, sponsor, date, role, navigation } = this.props;
    return (
      <Card onPress={() => this.handlePress(id, navigation)}>
        <Card.Content>
          <Title>{name}</Title>
          <Paragraph>{sponsor + " · " + date}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Chip style={{ textAlign: "center" }}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Chip>
        </Card.Actions>
      </Card>
    );
  }
}

export default UserTournamentCard;
