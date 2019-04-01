import React, { Component } from "react";
import { DefaultTheme, FAB } from "react-native-paper";

import NavigationAwarePortal from "./NavigationAwarePortal";

class EnterScoresButton extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
  constructor(props) {
    super(props);
  }

  state = {
    open: false
  };

  handleScorePress(navigation, tournamentId, matchId) {
    navigation.navigate("MatchScore", {
      tournamentId: tournamentId,
      matchId: matchId
    });
  }

  render() {
    const { tournamentId, matchId, navigation } = this.props;
    return (
      <NavigationAwarePortal>
        <FAB.Group
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: "#b3a369",
              accent: "#b3a369"
            }
          }}
          open={this.state.open}
          icon={this.state.open ? "cancel" : "assignment"} // if organizer, change to edit
          actions={[
            // if organizer, include matches and details
            //{ icon: 'games', label: 'Match', onPress: () => console.log('Pressed ')},
            {
              icon: "create",
              label: "Score Match",
              onPress: () =>
                this.handleScorePress(navigation, tournamentId, matchId)
            }
          ]}
          onStateChange={({ open }) => this.setState({ open })}
          onPress={() => {
            if (this.state.open) {
              // do something if the speed dial is open
            }
          }}
        />
      </NavigationAwarePortal>
    );
  }
}

export default EnterScoresButton;
