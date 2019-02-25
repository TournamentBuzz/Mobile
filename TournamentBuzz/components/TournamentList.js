import React, { Component } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import Container from "../components/Container";
import TournamentCard from "./TournamentCard";

class TournamentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentList: null
    };
  }

  // async createTournamentList() {
  //   // query api and get tournaments
  // }

  async componentDidMount() {
    // await this.createTournamentList();
    let list = [];
    let testTournament = (
      <TournamentCard
        key="id1"
        id="id1"
        name="Bob's Table Tennis Tournament"
        sponsor="Bob Waters"
        date="3/14/19"
      />
    );
    list.push(testTournament);
    let testTournament2 = (
      <TournamentCard
        key="id2"
        id="id2"
        name="Bowling Tournament"
        sponsor="Tech Rec"
        date="3/19/19"
      />
    );
    list.push(testTournament2);
    this.setState({ tournamentList: list });
  }

  render() {
    return (
      <Container>
        {this.state.tournamentList === null ? (
          <View>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View>{this.state.tournamentList}</View>
        )}
      </Container>
    );
  }
}

export default TournamentList;
