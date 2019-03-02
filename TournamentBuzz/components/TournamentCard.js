import React, { Component } from "react";
import { Card, Title, Paragraph } from "react-native-paper";

class TournamentCard extends Component {
  handlePress(id, navigation) {
    navigation.navigate("TournamentDetails", {
      tournamentId: id
    });
  }

  render() {
    const { id, name, sponsor, date, navigation } = this.props;
    return (
      <Card onPress={() => this.handlePress(id, navigation)}>
        <Card.Content>
          <Title>{name}</Title>
          <Paragraph>{sponsor + " · " + date}</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

export default TournamentCard;
