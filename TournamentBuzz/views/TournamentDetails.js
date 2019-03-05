import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Title, ActivityIndicator, Divider, FAB } from "react-native-paper";

import Container from "../components/Container";
import TournamentAPI from "../API/TournamentAPI.js";
import MatchList from "../components/MatchList";
import TeamList from "../components/TeamList";
import CreateButton from "../components/CreateButton";

class TournamentDetails extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
  constructor(props) {
    super(props);
    this.state = {
      tournamentId: this.props.navigation.getParam("tournamentId", null),
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
    let details = undefined;
    try {
      details = await TournamentAPI.getTournament(this.state.tournamentId);
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

  async componentDidMount() {
    await this.getTournamentDetails();
  }

  render() {
    return (
      <Container>
        <ScrollView>
          {this.state.tournamentName === null ? (
            <View>
              <ActivityIndicator animating={true} />
            </View>
          ) : (
            <View style={{marginLeft: 10}}>
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
          <Divider style={{ height: 4}} />
          <Title style={{marginLeft: 10}}>Matches</Title>
          <MatchList
            tournamentId={this.state.tournamentId}
            navigation={this.props.navigation}
          />
          <Divider style={{ height: 4}} />
          <Title style={{marginLeft: 10}}>Teams</Title>
          <TeamList
            tournamentId={this.state.tournamentId}
            navigation={this.props.navigation}
          />
        </ScrollView>
        <CreateButton
          tournamentId={this.state.tournamentId}
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}

export default TournamentDetails;
