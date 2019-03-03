import React, { Component } from "react";
import { View, Text } from "react-native";
import { Title, ActivityIndicator, Divider } from "react-native-paper";

class TeamCreate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        submitted: false,
        formError: "",
        tournamentId: this.props.match.params.tournamentID,
        teamName: ""
      };
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    render() {
        
    }
}

export default TeamCreate;