import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Title,
  ActivityIndicator,
  Divider,
  TextInput,
  Button
} from "react-native-paper";

import Container from "../components/Container";
import TeamAPI from "../API/TeamAPI";
import { Analytics, PageHit } from "expo-analytics";

class TeamCreate extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
  constructor(props) {
    super(props);
    this.state = {
      formError: "",
      tournamentId: this.props.navigation.getParam("tournamentId", null),
      teamName: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async handleFormSubmit() {
    if (this.state.teamName !== null) {
      await TeamAPI.createTeam(this.state.tournamentId, this.state.teamName);
      this.props.navigation.state.params.refresh();
      this.props.navigation.goBack();
    }
  }

  componentDidMount() {
    const analytics = new Analytics("UA-138304149-1");
    analytics.hit(new PageHit("TeamCreate"));
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <TextInput
            label="Team Name"
            value={this.state.teamName}
            onChangeText={teamName =>
              this.setState(prevState => ({
                formError: prevState.formError,
                tournamentId: prevState.tournamentId,
                teamName: teamName
              }))
            }
          />
          <Button onPress={() => this.handleFormSubmit()}>Submit</Button>
        </ScrollView>
      </Container>
    );
  }
}

export default TeamCreate;
