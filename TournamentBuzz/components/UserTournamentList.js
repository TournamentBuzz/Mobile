import React, { Component } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { ActivityIndicator, Title } from "react-native-paper";

import Container from "../components/Container";
import TournamentCard from "./TournamentCard";
import TournamentAPI from "../API/TournamentAPI.js";

class UserTournamentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentList: null,
      refreshing: false
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  async onRefresh() {
    this.setState({ refreshing: true });
    let tournaments = undefined;
    try {
      tournaments = await TournamentAPI.getUserTournaments();
    } catch (error) {
      console.log(error);
      this.setState({ refreshing: false });
      return;
    }
    if (tournaments.length < 1) {
      let message = <Title>No upcoming tournaments</Title>;
      this.setState({ tournamentList: message, refreshing: false });
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
    this.setState({ tournamentList: list, refreshing: false });
  }

  async createTournamentList() {
    let tournaments = undefined;
    try {
      tournaments = await TournamentAPI.getUserTournaments();
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        {this.state.tournamentList === null ? (
          <View>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View>{this.state.tournamentList}</View>
        )}
      </ScrollView>
    );
  }
}

export default UserTournamentList;
