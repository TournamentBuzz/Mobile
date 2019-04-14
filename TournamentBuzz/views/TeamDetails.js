import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Title, ActivityIndicator, Banner, Button } from "react-native-paper";

import Container from "../components/Container";
import TeamAPI from "../API/TeamAPI.js";
import Authentication from "../API/Authentication";
import { Analytics, PageHit } from "expo-analytics";

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
    this.handleClickAddMember = this.handleClickAddMember.bind(this);
  }

  async onRefresh() {
    let details = undefined;
    try {
      details = await TeamAPI.getTeam(this.state.teamId);
    } catch (error) {
      return;
    }
    if (details === undefined) {
      return;
    }
    if (details.length < 1) {
      return;
    }
    details = details[0];
    this.setState(details);

    let members = undefined;
    try {
      members = await TeamAPI.getTeamMembers(this.state.teamId);
    } catch (error) {
      return;
    }
    if (members === undefined) {
      return;
    }
    if (members.length < 1) {
      return;
    }
    let memberStr = "";
    for (member of members) {
      if (member.userEmail !== this.state.leader) {
        memberStr += member.userEmail + ", ";
      }
    }
    memberStr = memberStr.slice(0, -2);
    this.setState({ membersList: memberStr });
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
    details = details[0];
    this.setState(details);

    let members = undefined;
    try {
      members = await TeamAPI.getTeamMembers(this.state.teamId);
    } catch (error) {
      return;
    }
    if (members === undefined) {
      return;
    }
    if (members.length < 1) {
      return;
    }
    let memberStr = "";
    for (member of members) {
      if (member.userEmail !== this.state.leader) {
        memberStr += member.userEmail + ", ";
      }
    }
    memberStr = memberStr.slice(0, -2);
    this.setState({ membersList: memberStr });
  }

  handleClickAddMember() {
    this.props.navigation.navigate("TeamInvite", {
      teamId: this.state.teamId
    });
  }

  payForTeam() {
    this.props.navigation.navigate("TeamPayment", {
      teamId: this.state.teamId,
      entryCost: this.state.entryCost,
      refresh: this.onRefresh.bind(this)
    });
  }

  async componentDidMount() {
    const currentUser = await Authentication.getUID();
    this.setState({ currentUser: currentUser });
    await this.getTeamDetails();
    const analytics = new Analytics("UA-138304149-1");
    analytics.hit(new PageHit("TeamDetails"));
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
              {this.state.currentUser !== null &&
              this.state.currentUser === this.state.leader ? (
                <Button onPress={this.handleClickAddMember}>Add Member</Button>
              ) : null}
            </View>
          )}
        </ScrollView>
      </Container>
    );
  }
}

export default TeamDetails;
