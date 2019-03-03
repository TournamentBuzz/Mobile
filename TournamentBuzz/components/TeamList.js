import React, { Component } from "react";
import { View } from "react-native";
import { ActivityIndicator, Title } from "react-native-paper";

import Container from "../components/Container";
import TeamCard from "./TeamCard";
import TeamAPI from "../API/TeamAPI.js";

class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamList: null
    };
  }

  async createTeamList() {
    let teams = undefined;
    try {
      teams = await TeamAPI.getTeams(this.props.tournamentId);
    } catch (error) {
      let message = <Title>Error loading teams</Title>;
      this.setState({ teamList: message });
      return;
    }
    if (teams === undefined) {
      let message = <Title>Error loading teams</Title>;
      this.setState({ teamList: message });
      return;
    }
    if (teams.length < 1) {
      let message = <Title>No teams</Title>;
      this.setState({ teamList: message });
      return;
    }
    let list = [];
    for (let team of teams) {
      list.push(
        <TeamCard
          id={teams.id}
          key={team.id}
          teamName={team.teamName}
          navigation={this.props.navigation}
        />
      );
    }
    this.setState({ teamList: list });
  }

  async componentDidMount() {
    await this.createTeamList();
  }

  render() {
    return (
      <Container>
        {this.state.teamList === null ? (
          <View>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View>{this.state.teamList}</View>
        )}
      </Container>
    );
  }
}

export default TeamList;
