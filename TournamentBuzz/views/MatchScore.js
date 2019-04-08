import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Title,
  ActivityIndicator,
  TextInput,
  Button
} from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown";

import Container from "../components/Container";
import TournamentAPI from "../API/TournamentAPI";
import MatchAPI from "../API/MatchAPI";

class MatchScore extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
  constructor(props) {
    super(props);
    this.state = {
      formError: "",
      tournamentId: this.props.navigation.getParam("tournamentId", null),
      matchId: this.props.navigation.getParam("matchId", null),
      location: null,
      matchTime: null,
      matchName: null,
      teamA: {},
      teamB: {},
      scoreA: null,
      scoreB: null,
      winner: "0",
      loading: true
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async handleFormSubmit() {
    try {
      await MatchAPI.submitMatchScore(
        this.state.matchId,
        this.state.scoreA,
        this.state.scoreB,
        parseInt(this.state.winner, 10)
      );
      this.props.navigation.goBack();
    } catch (e) {
      return;
    }
  }

  onChangeHandler(value) {
    this.setState({ winner: value });
  }

  async getMatchDetails(id) {
    let details = undefined;
    try {
      details = await MatchAPI.getMatch(id);
    } catch (error) {
      this.props.navigation.goBack();
      return;
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
      details.teamA = { teamName: "Undetermined" };
    }
    if (details.teamB === null) {
      details.teamB = { teamName: "Undetermined" };
    }
    if (details.location === null) {
      details.location = "Undetermined";
    }
    details.winner = "" + details.winner;
    this.setState(details);
  }

  async getTournamentDetails(id) {
    let details = undefined;
    try {
      details = await TournamentAPI.getTournament(id);
    } catch (error) {
      this.props.navigation.goBack();
      return;
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
    this.setState({ creator: details.creator });
  }

  async componentDidMount() {
    await this.getMatchDetails(this.state.matchId);
    await this.getTournamentDetails(this.state.tournamentId);
    let data = [
      {
        value: "0",
        label: "No winner"
      },
      {
        value: "1",
        label: this.state.teamA ? this.state.teamA.teamName : "TBD"
      },
      {
        value: "2",
        label: this.state.teamB ? this.state.teamB.teamName : "TBD"
      }
    ];
    this.setState({ teamList: data, loading: false });
  }

  render() {
    return (
      <Container>
        <View style={{ marginLeft: 8, marginRight: 8 }}>
          {this.state.loading === true ? (
            <ActivityIndicator />
          ) : (
            <ScrollView>
              <Title>
                {this.state.teamA ? this.state.teamA.teamName : "TBD"} {" vs "}
                {this.state.teamB ? this.state.teamB.teamName : "TBD"}
              </Title>
              <Text>{this.state.matchTime}</Text>
              <Text>{this.state.location}</Text>
              <TextInput
                label={this.state.teamA ? this.state.teamA.teamName : "TBD"}
                value={`${this.state.scoreA}`}
                keyboardType="numeric"
                onChangeText={scoreA =>
                  this.setState(prevState => ({
                    formError: prevState.formError,
                    scoreA: scoreA
                  }))
                }
              />
              <TextInput
                label={this.state.teamB ? this.state.teamB.teamName : "TBD"}
                value={`${this.state.scoreB}`}
                keyboardType="numeric"
                onChangeText={scoreB =>
                  this.setState(prevState => ({
                    formError: prevState.formError,
                    scoreB: scoreB
                  }))
                }
              />
              <Dropdown
                label="Select Winner"
                data={this.state.teamList}
                value={this.state.winner}
                onChangeText={value => this.onChangeHandler(value)}
              />
              <Button onPress={() => this.handleFormSubmit()}>Submit</Button>
            </ScrollView>
          )}
        </View>
      </Container>
    );
  }
}

export default MatchScore;
