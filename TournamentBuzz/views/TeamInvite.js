import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Title,
  ActivityIndicator,
  Divider,
  TextInput,
  Button
} from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown";

import Container from "../components/Container";
import TeamAPI from "../API/TeamAPI";
import Authentication from "../API/Authentication";
import { Analytics, PageHit } from "expo-analytics";

class TeamInvite extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
  constructor(props) {
    super(props);
    this.state = {
      formError: "",
      teamId: this.props.navigation.getParam("teamId", null),
      playerList: [{ value: "" }],
      selectedPlayer: null
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  onChangeHandler(value) {
    this.setState({ selectedPlayer: value });
  }

  async handleFormSubmit() {
    if (this.state.teamId !== null && this.state.selectedPlayer !== null) {
      try {
        await TeamAPI.inviteToTeam(
          this.state.teamId,
          this.state.selectedPlayer
        );
        this.props.navigation.goBack();
        return;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getPlayerList() {
    let list = [];
    let users = await TeamAPI.getPlayerList();
    for (let user of users) {
      list.push({ value: user.userName });
    }
    this.setState({ playerList: list });
  }

  async componentDidMount() {
    const currentUser = await Authentication.getUID();
    this.setState({ currentUser: currentUser });
    await this.getPlayerList();
    const analytics = new Analytics("UA-138304149-1");
    analytics.hit(new PageHit("TeamInvite"));
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Dropdown
              label="Invite Player"
              data={this.state.playerList}
              onChangeText={value => this.onChangeHandler(value)}
            />
            <Button onPress={() => this.handleFormSubmit()}>Invite</Button>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default TeamInvite;
