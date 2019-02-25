import React, { Component } from "react";
import { Card, Title, Paragraph } from "react-native-paper";

class TournamentCard extends Component {
  handlePress(id) {
    // TODO: go to tournament page
    console.log(id);
  }

  render() {
    const { id, name, sponsor, date } = this.props;
    return (
      <Card onPress={() => this.handlePress(id)}>
        <Card.Content>
          <Title>{name}</Title>
          <Paragraph>{sponsor + " · " + date}</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

export default TournamentCard;
