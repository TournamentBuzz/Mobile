import React from "react";
import { View, Text } from "react-native";
// core components
import MatchAPI from "../API/MatchAPI";
import TournamentBracket from "../components/TournamentBracket.js";
import Authentication from "../API/Authentication";
import TeamAPI from "../API/TeamAPI";

async function isPartOfTeam(teamsList) {
  const UID = Authentication.getUID();
  for (i = 0; i < teamsList.length; i++) {
    team = teamsList[i];
    members = await TeamAPI.getTeamMembers(team);
    for (const member of members) {
      if (UID._55 === member.userEmail) {
        return i;
      }
    }
  }
  return null;
}

class ViewBracket extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matches: [], promoted: null };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    await this.createMatchList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh !== this.state.refresh) {
      this.refreshList();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.refresh !== prevState.refresh) {
      return { refresh: nextProps.refresh };
    } else return null;
  }

  async refreshList() {
    let match = undefined;
    try {
      match = await MatchAPI.getMatches(this.props.tournamentId);
    } catch (error) {
      let message = <Text style={{ marginLeft: 10 }}>Error loading matches</Text>;
      this.setState({ matches: message });
      return;
    }
    if (match === undefined) {
      let message = <Text style={{ marginLeft: 10 }}>Error loading matches</Text>;
      this.setState({ matches: message });
      return;
    }
    if (match.length < 1) {
      let message = <Text style={{ marginLeft: 10 }}>No matches</Text>;
      this.setState({ matches: message });
      return;
    }
    teamSet = new Set();
    try {
      for (const m of match) {
        const teamA = m.teamA.teamId;
        const teamB = m.teamB.teamId;
        teamSet.add(teamA);
        teamSet.add(teamB);
      }
    } catch (error) {
      // not round robin
    }
    const teams = Array.from(teamSet);
    promote = await isPartOfTeam(teams);
    this.setState({ matches: match, promoted: promote });
  }

  async createMatchList() {
    let match = undefined;
    try {
      match = await MatchAPI.getMatches(this.props.tournamentId);
    } catch (error) {
      let message = <Text style={{ marginLeft: 10 }}>Error loading matches</Text>;
      this.setState({ matches: message });
      return;
    }
    if (match === undefined) {
      let message = <Text style={{ marginLeft: 10 }}>Error loading matches</Text>;
      this.setState({ matches: message });
      return;
    }
    if (match.length < 1) {
      let message = <Text style={{ marginLeft: 10 }}>No matches</Text>;
      this.setState({ matches: message });
      return;
    }
    teamSet = new Set();
    try {
      for (const m of match) {
        const teamA = m.teamA.teamId;
        const teamB = m.teamB.teamId;
        teamSet.add(teamA);
        teamSet.add(teamB);
      }
    } catch (error) {
      // not round robin
    }
    const teams = Array.from(teamSet);
    promote = await isPartOfTeam(teams);
    this.setState({ matches: match, promoted: promote });
  }

  render() {
    return (
      <View>
          <TournamentBracket 
            matchesList={this.state.matches} 
            promoted={this.state.promoted}
            navigation={this.props.navigation}
          />
      </View>
    );
  }
}

export default ViewBracket;