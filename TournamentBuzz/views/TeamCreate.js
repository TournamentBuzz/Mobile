import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Title, ActivityIndicator, Divider, TextInput, Button } from "react-native-paper";

import Container from "../components/Container";
import TeamAPI from "../API/TeamAPI";

class TeamCreate extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
    constructor(props) {
      super(props);
      this.state = {
        //submitted: false,
        formError: "",
        tournamentId: this.props.navigation.getParam("tournamentId", null),
        teamName: ""
      };
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit() {
      if (teamName !== null) {
        TeamAPI.createTeam(this.state.tournamentId, this.state.teamName);
      }
    }

    render() {
      return (
        <Container>
          <ScrollView>
            <TextInput
              label="Team Name"
              value={this.state.teamName}
              onChangeText={teamName => this.setState((prevState) => 
                ({formError:prevState.formError, tournamentId: prevState.tournamentId, teamName: teamName}))}
            />
            <Button onPress={() => handleFormSubmit()}>Submit</Button>
          </ScrollView>
        </Container>
      );
    }
}

export default TeamCreate;