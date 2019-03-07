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
      teamList: null,
      refresh: props.refresh
    };
    this.refreshList = this.refreshList.bind(this);
  }

  async refreshList() {
    let teams = undefined;
    try {
      teams = await TeamAPI.getTeams(this.props.tournamentId);
    } catch (error) {
      return;
    }
    if (teams === undefined) {
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
          id={team.id}
          key={team.id}
          teamName={team.teamName}
          navigation={this.props.navigation}
        />
      );
    }
    this.setState({ teamList: list });
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
          id={team.id}
          key={team.id}
          teamName={team.teamName}
          navigation={this.props.navigation}
        />
      );
    }
    this.setState({ teamList: list });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh !== this.state.refresh) {
      this.refreshList();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.refresh !== prevState.refresh) {
      return { refresh: nextProps.refresh };
    } else return null;
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
