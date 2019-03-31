import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { ActivityIndicator, Title } from "react-native-paper";

import Container from "../components/Container";
import MatchCard from "./MatchCard";
import MatchAPI from "../API/MatchAPI.js";

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchList: null,
      refresh: this.props.navigation.getParam("refresh", null)
    };
    this.refreshList = this.refreshList.bind(this);
  }

  async refreshList() {
    let matches = undefined;
    try {
      matches = await MatchAPI.getMatches(this.props.navigation.getParam("tournamentId", null));
    } catch (error) {
      return;
    }
    if (matches === undefined) {
      return;
    }
    if (matches.length < 1) {
      let message = <Title style={{ marginLeft: 10 }}>No matches</Title>;
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

  async createMatchList() {
    let matches = undefined;
    try {
      matches = await MatchAPI.getMatches(this.props.navigation.getParam("tournamentId", null));
    } catch (error) {
      let message = <Title style={{ marginLeft: 10 }}>Error loading matches</Title>;
      this.setState({ matchList: message });
      return;
    }
    if (matches === undefined) {
      let message = <Title style={{ marginLeft: 10 }}>Error loading matches</Title>;
      this.setState({ matchList: message });
      return;
    }
    if (matches.length < 1) {
      let message = <Title style={{ marginLeft: 10 }}>No matches</Title>;
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
          <ScrollView>
            <View>{this.state.matchList}</View>
          </ScrollView>
        )}
      </Container>
    );
  }
}

export default MatchList;
