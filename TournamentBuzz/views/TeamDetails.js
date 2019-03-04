import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Title, ActivityIndicator} from "react-native-paper";

import Container from "../components/Container";
import TeamAPI from "../API/TeamAPI.js";

class TeamDetails extends Component {
    static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
    constructor(props) {
      super(props);
      this.state = {
        teamId: this.props.navigation.getParam("teamId", null),
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
      details = details[0];
      this.setState(details);
    }
  
    async componentDidMount() {
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
              <View style={{marginLeft: 10}}>
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