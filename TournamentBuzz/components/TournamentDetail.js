import React, { Component } from "react";
import { View, Text } from "react-native";
import { Title, ActivityIndicator } from "react-native-paper";

import Container from "../components/Container";

class TournamentDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tournamentInfo: null,
        matchList: null,
        teamList: null
      };
    }
  
    // async createTournamentInfo() {
    //   // query api and get tournament info
    // }

    // async createMatchList() {
    //   // query api and get matches
    // }

    // async createTeamList() {
    //   // query api and get matches
    // }
  
    async componentDidMount() {
      let info = new Map();
      info.set("name", "Bob's Table Tennis Tournament");
      info.set("sponsor", "Bob Waters");
      info.set("location", "CRC");
      info.set("scoringType", "Points");
      info.set("tournamentType", "Single Elimination");
      info.set("maxTeamSize", 4);
      info.set("entryCost", 0);
      info.set("maxTeams", 32);
      info.set("startDate", "10/28/2019");
      info.set("endDate", "10/29/2019");
      this.setState({ tournamentInfo: info });
    }
  
    render() {
      return (
        <Container>
          {this.state.tournamentInfo === null ? (
            <View>
              <ActivityIndicator animating={true} />
            </View>
          ) : (
            <View>
            <Title>{this.state.tournamentInfo.get("name")}</Title>
            <Text>{"Sponsor: " + this.state.tournamentInfo.get("sponsor")}</Text>
            <Text>{"Location: " + this.state.tournamentInfo.get("location")}</Text>
            <Text>{"Scoring Type: " + this.state.tournamentInfo.get("scoringType")}</Text>
            <Text>{"Tournament Type: " + this.state.tournamentInfo.get("tournamentType")}</Text>
            <Text>{"Max Team Size: " + this.state.tournamentInfo.get("maxTeamSize")}</Text>
            <Text>{"Entry Cost: " + this.state.tournamentInfo.get("entryCost")}</Text>
            <Text>{"Max Teams: " + this.state.tournamentInfo.get("maxTeams")}</Text>
            <Text>{"Start Date: " + this.state.tournamentInfo.get("startDate")}</Text>
            <Text>{"End Date: " + this.state.tournamentInfo.get("endDate")}</Text>
            </View>
          )}
        </Container>
      );
    }
  }
  
  export default TournamentDetail;
  