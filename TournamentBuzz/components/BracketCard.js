import React, { Component } from "react";
import { Card, Divider, Title, Text, View } from "react-native-paper";

class BracketCard extends Component {
  handlePress(id, navigation) {
    navigation.navigate("MatchDetails", {
       matchId: id
    });
  }

  render() {
    // update to better reflect scores and sides - top/bottom half of card should be team and score
    const { tournamentMatch, navigation } = this.props;
    let aTeam;
    let bTeam;
    if (tournamentMatch.scoreA === 0) {
      tournamentMatch.scoreA = "0";
    }
    if (tournamentMatch.scoreB === 0) {
      tournamentMatch.scoreB = "0";
    }
    if (tournamentMatch.teamA !== null && tournamentMatch.teamA.teamName !== undefined) {
      aTeam = tournamentMatch.teamA.teamName + ": " + (tournamentMatch.scoreA || "-");
    } else if (tournamentMatch.feederA !== null) {
      aTeam = "TBD";
    } else {
      aTeam = "Bye";
    }
    if (tournamentMatch.teamB !== null && tournamentMatch.teamB.teamName !== undefined) {
      bTeam = tournamentMatch.teamB.teamName + ": " + (tournamentMatch.scoreB || "-");
    } else if (tournamentMatch.feederB !== null) {
      bTeam = "TBD";
    } else {
      bTeam = "Bye";
    }
    return (
      <Card onPress={() => this.handlePress(tournamentMatch.id, navigation)}
        style={{borderWidth: 0.5, borderColor: 'black', elevation: 5}}>
        {tournamentMatch.winner === null ? (
            <Card.Content width={190/*TODO: find as part of screen size instead of constant */}>
            <Text>{tournamentMatch.matchName}</Text>
            <Title>{aTeam}</Title>
            <Divider style={{ height: 1 }} />
            <Title>{bTeam}</Title>
            </Card.Content>
          ) : (
            tournamentMatch.winner === 1 ? (
              <Card.Content width={190/*TODO: find as part of screen size instead of constant */}>
              <Text>{tournamentMatch.matchName}</Text>
              <Title style={{color:"#b3a369"}}>{aTeam}</Title>
              <Divider style={{ height: 1 }} />
              <Title>{bTeam}</Title>
              </Card.Content>
            ) : (
              <Card.Content width={190/*TODO: find as part of screen size instead of constant */}>
              <Text>{tournamentMatch.matchName}</Text>
              <Title>{aTeam}</Title>
              <Divider style={{ height: 1 }} />
              <Title style={{color:"#b3a369"}}>{bTeam}</Title>
              </Card.Content>
            )
          )}
        
      </Card>
    );
  }
}

export default BracketCard;
