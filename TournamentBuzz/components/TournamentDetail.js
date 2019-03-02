import React, { Component } from "react";
import { View, Text } from "react-native";
import { Title, ActivityIndicator } from "react-native-paper";

import Container from "../components/Container";
import TournamentAPI from "../API/TournamentAPI.js";

class TournamentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentName: null,
      creator: null,
      description: null,
      maxTeamSize: null,
      location: null,
      scoringType: null,
      tournamentType: null,
      entryCost: null,
      maxTeams: null,
      startDate: null,
      endDate: null,
      teamList: null
    };
  }

  async getTournamentDetails() {
    const tournamentId = this.props.navigation.getParam("tournamentId", null);
    let details = undefined;
    try {
      details = await TournamentAPI.getTournament(tournamentId);
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
    details.startDate = new Date(details.startDate).toDateString();
    details.endDate = new Date(details.endDate).toDateString();
    this.setState(details);
  }

  // async createMatchList() {
  //   // query api and get matches
  // }

  // async createTeamList() {
  //   // query api and get matches
  // }

  async componentDidMount() {
    await this.getTournamentDetails();
  }

  render() {
    return (
      <Container>
        {this.state.tournamentName === null ? (
          <View>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View>
            <Title>{this.state.tournamentName}</Title>
            <Text>{"Sponsor: " + this.state.creator}</Text>
            <Text>{"Location: " + this.state.location}</Text>
            <Text>{"Scoring Type: " + this.state.scoringType}</Text>
            <Text>{"Tournament Type: " + this.state.tournamentType}</Text>
            <Text>{"Max Team Size: " + this.state.maxTeamSize}</Text>
            <Text>{"Entry Cost: " + this.state.entryCost}</Text>
            <Text>{"Max Teams: " + this.state.maxTeams}</Text>
            <Text>{"Start Date: " + this.state.startDate}</Text>
            <Text>{"End Date: " + this.state.endDate}</Text>
          </View>
        )}
      </Container>
    );
  }
}

export default TournamentDetail;
