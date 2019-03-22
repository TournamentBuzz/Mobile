import React, { Component } from "react";
import { Card, Title, Paragraph } from "react-native-paper";

class BracketCard extends Component {
  handlePress(id, navigation) {
    navigation.navigate("MatchDetails", {
       matchId: id
    });
  }

  render() {
    // update to better reflect scores and sides
    const { tournamentMatch, navigation } = this.props;
    const timeString = tournamentMatch.matchTime
      ? new Date(tournamentMatch.matchTime).toLocaleDateString() +
        " @ " +
        new Date(tournamentMatch.matchTime).toLocaleTimeString()
      : "";
    const matchName =
      `Match ${tournamentMatch.id}: ` +
      (tournamentMatch.matchName ||
        `${tournamentMatch.teamA.teamName || "~Bye~"} vs. ${tournamentMatch
          .teamB.teamName || "~Bye~"}`);
    return (
      <Card onPress={() => this.handlePress(tournamentMatch.id, navigation)}>
        <Card.Content>
          <Title>{matchName}</Title>
          <Paragraph>{timeString}</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

export default BracketCard;
