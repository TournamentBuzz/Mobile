import React, { Component } from "react";
import { View, Text } from "react-native";
import { Title, ActivityIndicator, Divider } from "react-native-paper";

class TeamDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {
        teamID: this.props.match.params.teamID,
        teamName: null,
        leader: null,
        tournamentID: null,
        paid: null,
        seed: null,
        entryCost: null,
        membersList: null,
        currentUser: Authentication.getUID()
      };
      this.handleClickDelete = this.handleClickDelete.bind(this);
      this.handleClickAddMember = this.handleClickAddMember.bind(this);
    }

    /*
    async getTeamDetails(id) {

    }
    
    async getTeamMembers(id) {

    }*/

    render() {

    }
}

export default TeamDetails;