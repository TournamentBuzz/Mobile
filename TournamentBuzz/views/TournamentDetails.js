import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { Title, ActivityIndicator, Divider, Button } from "react-native-paper";

import Container from "../components/Container";
import TournamentAPI from "../API/TournamentAPI.js";
import MatchList from "../components/MatchList";
import TeamList from "../components/TeamList";
import CreateButton from "../components/CreateButton";
import ViewBracket from "../views/ViewBracket";
import { Analytics, PageHit } from "expo-analytics";

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
      teamList: null,
      refreshing: false,
      refreshChildren: false
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  async onRefresh() {
    this.setState({
      refreshing: true,
      refreshChildren: !this.state.refreshChildren
    });
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
    this.setState({ refreshing: false, details: details });
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
    const analytics = new Analytics("UA-138304149-1");
    analytics.hit(new PageHit("TournamentDetails"));
  }

  render() {
    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {this.state.tournamentName === null ? (
            <View>
              <ActivityIndicator animating={true} />
            </View>
          ) : (
            <View style={{ marginLeft: 10, marginBottom: 10 }}>
              <Title>{this.state.tournamentName}</Title>
              <Text style={{ fontSize: 16 }}>
                {"Sponsor: " + this.state.creator}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {"Location: " + this.state.location}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {"Tournament Details: " +
                  this.state.tournamentType +
                  ", " +
                  this.state.scoringType}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {"Entry Cost: $" + this.state.entryCost}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {"Max Teams: " +
                  this.state.maxTeams +
                  " teams of at most " +
                  this.state.maxTeamSize +
                  " people"}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {"Duration: " +
                  this.state.startDate +
                  " - " +
                  this.state.endDate}
              </Text>
            </View>
          )}
          <Divider style={{ height: 4 }} />
          <Title style={{ marginLeft: 10 }}>Matches</Title>
          <ViewBracket
            tournamentId={this.state.tournamentId}
            navigation={this.props.navigation}
            refresh={this.state.refreshChildren}
          />
          <Button
            onPress={() =>
              this.props.navigation.navigate("MatchList", {
                tournamentId: this.state.tournamentId,
                navigation: this.props.navigation,
                refresh: this.state.refreshChildren
              })
            }
          >
            View Full Match List
          </Button>
          <Divider style={{ height: 4 }} />
          <Title style={{ marginLeft: 10 }}>Teams</Title>
          <TeamList
            tournamentId={this.state.tournamentId}
            navigation={this.props.navigation}
            refresh={this.state.refreshChildren}
          />
        </ScrollView>
        <CreateButton
          tournamentId={this.state.tournamentId}
          navigation={this.props.navigation}
          refresh={this.onRefresh}
        />
      </Container>
    );
  }
}

export default TournamentDetails;
