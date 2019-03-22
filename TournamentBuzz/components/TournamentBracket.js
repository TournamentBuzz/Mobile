import React from "react";
import { View, Text } from "react-native";
import { DataTable } from "react-native-paper"

function makeMatchesObject(matchesList) {
  const rootMatch = getRootMatch(matchesList);
  const idToMatch = mapIdToMatch(matchesList);
  function sideHelper(team, score, feeder) {
    const side = {};
    if (team) {
      side.team = {
        id: String(team.teamId),
        name: String(team.teamName)
      };
    }
    if (score != null) {
      side.score = { score };
    }
    const match = idToMatch.get(feeder);
    if (
      feeder &&
      (match.feederA || match.feederB || (match.teamA && match.teamB))
    ) {
      const match = idToMatch.get(feeder);
      side.seed = {
        rank: 1,
        sourceGame: helper(match)
      };
    }
    return side;
  }

  function helper(match) {
    const home = sideHelper(match.teamA, match.scoreA, match.feederA);
    const visitor = sideHelper(match.teamB, match.scoreB, match.feederB);
    const game = {
      id: String(match.id),
      name: String(match.matchName),
      scheduled: Date.parse(match.matchTime),
      court: {
        name: match.location,
        venue: { name: match.location }
      },
      sides: { home, visitor }
    };
    return game;
  }
  return helper(rootMatch);
}

function getRootMatch(matchesList) {
  const matchesWithParents = new Set();
  for (const { feederA, feederB } of matchesList) {
    if (feederA) matchesWithParents.add(feederA);
    if (feederB) matchesWithParents.add(feederB);
  }
  for (const match of matchesList) {
    if (!matchesWithParents.has(match.id)) {
      return match;
    }
  }
  return undefined;
}

function getDepth(matchesList, rootMatch) {
  if (rootMatch === null || (rootMatch.feederA === null && rootMatch.feederB === null)) {
    return 1;
  } else if (rootMatch.feederA === null) {
    for (i = 0; i < matchesList.length; i++) {
      if (matchesList[i].id === rootMatch.feederB) {
        return 1 + getDepth(matchesList, matchesList[i]);
      }
    }
    return 1;
  } else if (rootMatch.feederB === null) {
    for (i = 0; i < matchesList.length; i++) {
      if (matchesList[i].id === rootMatch.feederA) {
        return 1 + getDepth(matchesList, matchesList[i]);
      }
    }
    return 1;
  } else {
    let feederA = null;
    let feederB = null;
    for (i = 0; i < matchesList.length; i++) {
      if (matchesList[i].id === rootMatch.feederB) {
        feederB == matchesList[i];
      }
    }
    for (i = 0; i < matchesList.length; i++) {
      if (matchesList[i].id === rootMatch.feederA) {
        feederA == matchesList[i];
      }
    }
    const b = getDepth(matchesList, feederA);
    const a = getDepth(matchesList, feederB);
    if (b > a) {
      return b + 1;
    } else {
      return a + 1;
    }
  }
}

function mapIdToMatch(matchesList) {
  const mapping = new Map();
  for (const match of matchesList) {
    mapping.set(match.id, match);
  }
  return mapping;
}

function isRoundRobin(matchesList) {
  for (const match of matchesList) {
    if (match.feederA || match.feederB) {
      return false;
    }
  }
  return true;
}

class TournamentBracket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curPage: 1
    };
  }

  renderBracket() {
    const matchesList = this.props.matchesList;
    //console.log(matchesList);
    if (matchesList.length > 0 && !isRoundRobin(matchesList)) {
      //const matchesObject = makeMatchesObject(matchesList);
      const rootMatch = getRootMatch(matchesList);
      const depth = getDepth(matchesList, rootMatch);
      
      // horizontal scrollview component, each with its own vertical scrollview that lists the matches? https://facebook.github.io/react-native/docs/scrollview

      return (<Text> This isn't ready yet :) </Text>);
      /* return <Bracket game={matchesObject} />;*/
    }
    if (matchesList.length > 0 && isRoundRobin(matchesList)) {
      const teamResults = {};
      for (const match of matchesList) {
        const teamA = match.teamA.teamName;
        const teamB = match.teamB.teamName;
        teamResults[teamA] = teamResults[teamA] || {};
        teamResults[teamB] = teamResults[teamB] || {};
        if (match.winner === 1) {
          teamResults[teamA][teamB] = true;
          teamResults[teamB][teamA] = false;
        } else if (match.winner === 2) {
          teamResults[teamA][teamB] = false;
          teamResults[teamB][teamA] = true;
        }
      }
      const teams = Object.keys(teamResults);
      if (this.props.promoted !== null) {
        temp = teams[this.props.promoted];
        teams[this.props.promoted] = teams[0];
        teams[0] = temp;
      }
      let teamArray = [];
      for (i = 0; i < teams.length; i++) {
        teamArray[i] = [teams[i]];
      }
      const numTeams = teams.length;
      teams.splice(teams.indexOf(teamArray[(this.state.curPage - 1)][0]), 1);
      return (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title />
              {teamArray[(this.state.curPage - 1)].map(team => (
                <DataTable.Cell key={team}>{team}</DataTable.Cell>
              ))}
          </DataTable.Header>

          {teams.map(teamA => (
                <DataTable.Row key={teamA}>
                <DataTable.Cell>vs. {teamA} </DataTable.Cell>
                  {teamArray[(this.state.curPage - 1)].map(
                    teamB =>
                      teamA !== teamB ? (
                        <DataTable.Cell key={teamB}>
                        <Text>
                            {(() => {
                              if (teamResults[teamA][teamB] === true) {
                                return "Win";
                              }
                              if (teamResults[teamA][teamB] === false) {
                                return "Lose";
                              }
                              return "Pending";
                            })()}{" "}
                          vs {teamA}
                          </Text>
                        </DataTable.Cell>
                      ) : (
                        <DataTable.Cell key={"-"}></DataTable.Cell>
                      )
                  )}
                </DataTable.Row>
              ))}
          <DataTable.Pagination
            page={(this.state.curPage - 1)}
            numberOfPages={(numTeams)}
            onPageChange={(page) => { this.setState({curPage: (page+1)}) }}
            label={this.state.curPage + " of " + (numTeams)}
          />
        </DataTable>
      );
    }
    return (<Text>No Matches</Text>);
  }

  render() {
    try {
      return this.renderBracket();
    } catch (error) {
      return (
        <View>
            <Text>Error displaying tournament bracket</Text>
            <Text>{String(error)}</Text>
        </View>
      );
    }
  }
}

export default TournamentBracket;