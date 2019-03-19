import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Title, ActivityIndicator, Banner } from "react-native-paper";

import Container from "../components/Container";
import TeamAPI from "../API/TeamAPI.js";
import Authentication from "../API/Authentication";

class TeamDetails extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
  constructor(props) {
    super(props);
    this.state = {
      teamId: this.props.navigation.getParam("teamId", null),
      currentUser: null,
      teamName: null,
      leader: null,
      tournamentID: null,
      paid: null,
      seed: null,
      entryCost: null,
      membersList: null
    };
    //this.handleClickDelete = this.handleClickDelete.bind(this);
    //this.handleClickAddMember = this.handleClickAddMember.bind(this);
  }

  async getTeamDetails() {
    let details = undefined;
    try {
      details = await TeamAPI.getTeam(this.state.teamId);
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

    //TODO: make call for team members

    details = details[0];
    this.setState(details);
  }

  payForTeam() {
    this.props.navigation.navigate("TeamPayment", {
      teamId: this.state.teamId,
      entryCost: this.state.entryCost
    });
  }

  async componentDidMount() {
    const currentUser = await Authentication.getUID();
    this.setState({ currentUser: currentUser });
    await this.getTeamDetails();
  }

  render() {
    return (
      <Container>
        <ScrollView>
          {this.state.teamName === null ? (
            <View>
              <ActivityIndicator animating={true} />
            </View>
          ) : (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
              <Banner
                visible={
                  !this.state.paid &&
                  this.state.currentUser !== null &&
                  this.state.currentUser === this.state.leader
                }
                actions={[
                  {
                    label: "Pay Now",
                    onPress: this.payForTeam.bind(this)
                  }
                ]}
              >
                The team entry fee of ${this.state.entryCost} has not been paid
                yet
              </Banner>
              <Title>{this.state.teamName}</Title>
              <Text>{"Leader: " + this.state.leader}</Text>
              {this.state.membersList !== null ? (
                <Text>{"Members: " + this.state.membersList}</Text>
              ) : (
                <Text>{"-"}</Text>
              )}
            </View>
          )}
        </ScrollView>
      </Container>
    );
  }
}

export default TeamDetails;
