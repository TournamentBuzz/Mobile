import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { ActivityIndicator, Title } from "react-native-paper";

import Container from "../components/Container";
import TournamentCard from "./TournamentCard";
import TournamentAPI from "../API/TournamentAPI.js";

class TournamentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentList: null
    };
  }

  async createTournamentList() {
    let tournaments = undefined;
    try {
      tournaments = await TournamentAPI.getTournaments();
    } catch (error) {
      console.log(error);
      let message = <Title>Error loading tournaments</Title>;
      this.setState({ tournamentList: message });
      return;
    }
    if (tournaments.length < 1) {
      let message = <Title>No upcoming tournaments</Title>;
      this.setState({ tournamentList: message });
      return;
    }
    let list = [];
    for (let tournament of tournaments) {
      let card = (
        <TournamentCard
          key={tournament.id}
          id={tournament.id}
          name={tournament.tournamentName}
          sponsor={tournament.creator}
          date={new Date(Date.parse(tournament.startDate)).toDateString()}
          navigation={this.props.navigation}
        />
      );
      list.push(card);
    }
    this.setState({ tournamentList: list });
  }

  async componentDidMount() {
    await this.createTournamentList();
  }

  render() {
    return (
      <Container>
        <ScrollView>
          {this.state.tournamentList === null ? (
            <View>
              <ActivityIndicator animating={true} />
            </View>
          ) : (
            <View>{this.state.tournamentList}</View>
          )}
        </ScrollView>
      </Container>
    );
  }
}

export default TournamentList;
