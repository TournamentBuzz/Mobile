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
        teamA: {},
        teamB: {},
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
                <View>
                <Title>{this.state.teamName}</Title>
                <Text>{"Team A: " + this.state.teamA.teamName}</Text>
                <Text>{"vs"}</Text>
                <Text>{"Team B: " + this.state.teamB.teamName}</Text>
                <Text>{"Time: " + this.state.matchTime}</Text>
                <Text>{"Location: " + this.state.location}</Text>
              </View>
              ) : (
                <View>
                <Title>{this.state.teamName}</Title>
                <Text>{"Team A: " + this.state.teamA.teamName + ": " + this.state.scoreA}</Text>
                <Text>{"vs"}</Text>
                <Text>{"Team B: " + this.state.teamB.teamName + ": " + this.state.scoreB}</Text>
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