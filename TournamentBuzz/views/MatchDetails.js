import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Title, ActivityIndicator, Divider } from "react-native-paper";

import Container from "../components/Container";
import MatchAPI from "../API/MatchAPI.js";

class MatchDetails extends Component {
    static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
    constructor(props) {
      super(props);
      this.state = {
        creator: null,
        tournamentID: null,
        matchID: this.props.navigation.getParam("matchId", null),
        location: null,
        matchTime: null,
        matchName: null,
        teamA: {teamName: "Undetermined"},
        teamB: {teamName: "Undetermined"},
        published: null,
        isReferee: false,
        scoreButtonText: "Enter Scores",
        enteringScores: false,
        scoreA: null,
        scoreB: null,
        winner: "0"
      };
    }

    async getMatchDetails() {
      let details = undefined;
      try {
        details = await MatchAPI.getMatch(this.state.matchID);
      } catch (error) {
        this.props.navigation.goBack();
      }
      if (details === undefined) {
        this.props.navigation.goBack();
        return;
      }
      if (details.length < 1) {
        this.props.navigation.goBack();
        return;
      }
      details = details[0];
      details.matchTime = new Date(details.matchTime).toDateString();
      if (details.teamA === null) {
        details.teamA = {teamName: "Undetermined"};
      }
      if (details.teamB === null) {
        details.teamB = {teamName: "Undetermined"};
      }
      if (details.location === null) {
        details.location = "Undetermined";
      }
      this.setState(details);
    }
  
    async componentDidMount() {
      await this.getMatchDetails();
    }

    render() {
      return (
        <Container>
          <ScrollView>
            {this.state.matchID === null ? (
              <View>
                <ActivityIndicator animating={true} />
              </View>
            ) : (
              <View>
              {this.state.scoreA === null ? (
                <View style={{marginLeft: 10}}>
                <Title>{this.state.matchName}</Title>
                <Title>{this.state.teamA.teamName  + " vs " + this.state.teamB.teamName}</Title>
                <Text>{"Time: " + this.state.matchTime}</Text>
                <Text>{"Location: " + this.state.location}</Text>
              </View>
              ) : (
                <View style={{marginLeft: 10}}>
                <Title>{this.state.matchName}</Title>
                <Title>{this.state.teamA.teamName  + " vs " + this.state.teamB.teamName}</Title>
                <Text>{this.state.scoreA + " : " +  this.state.scoreB}</Text>
                <Text>{"Time: " + this.state.matchTime}</Text>
                <Text>{"Location: " + this.state.location}</Text>
              </View>
              )}
              </View>
            )}
          </ScrollView>
        </Container>
      );
    }
}

export default MatchDetails;