import React, { Component } from "react";
import { View } from "react-native";
import { ActivityIndicator, Title } from "react-native-paper";

import Container from "../components/Container";
import MatchCard from "./MatchCard";
import MatchAPI from "../API/MatchAPI.js";

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchList: null
    };
  }

  async createMatchList() {
    let matches = undefined;
    try {
      matches = await MatchAPI.getMatches(this.props.tournamentId);
    } catch (error) {
      let message = <Title>Error loading matches</Title>;
      this.setState({ matchList: message });
      return;
    }
    if (matches === undefined) {
      let message = <Title>Error loading matches</Title>;
      this.setState({ matchList: message });
      return;
    }
    if (matches.length < 1) {
      let message = <Title>No matches</Title>;
      this.setState({ matchList: message });
      return;
    }
    let list = [];
    for (let match of matches) {
      list.push(
        <MatchCard
          tournamentMatch={match}
          key={match.id}
          navigation={this.props.navigation}
        />
      );
    }
    this.setState({ matchList: list });
  }

  async componentDidMount() {
    await this.createMatchList();
  }

  render() {
    return (
      <Container>
        {this.state.matchList === null ? (
          <View>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View>{this.state.matchList}</View>
        )}
      </Container>
    );
  }
}

export default MatchList;
