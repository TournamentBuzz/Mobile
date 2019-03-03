import React, { Component } from "react";
import { View, Text } from "react-native";
import { Title, ActivityIndicator, Divider } from "react-native-paper";

class MatchDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUser: Authentication.getUID(),
        creator: null,
        tournamentID: this.props.match.params.tournamentID,
        matchID: this.props.match.params.matchID,
        location: null,
        matchTime: null,
        matchName: null,
        teamA: {},
        teamB: {},
        published: null,
        isReferee: false,
        scoreButtonText: "Enter Scores",
        enteringScores: false,
        scoreA: null,
        scoreB: null,
        winner: "0"
      };
    }

    /*async getMatchDetails(id) {

    }


    async getTournamentDetails(id) {

    }*/

    render() {

    }
}

export default MatchDetails;