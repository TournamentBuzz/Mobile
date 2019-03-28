import React, { Component } from "react";
import { DefaultTheme, FAB } from "react-native-paper";

import NavigationAwarePortal from "./NavigationAwarePortal";

class CreateButton extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
  constructor(props) {
    super(props);
  }

  state = {
    open: false
  };

  handleTeamPress(navigation, tournamentId, refresh) {
    navigation.navigate("TeamCreate", {
      tournamentId: tournamentId,
      refresh: refresh
    });
  }

  render() {
    const { tournamentId, navigation, refresh } = this.props;
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
          icon={this.state.open ? "cancel" : "add"} // if organizer, change to edit
          actions={[
            // if organizer, include matches and details
            //{ icon: 'games', label: 'Match', onPress: () => console.log('Pressed ')},
            {
              icon: "account-box",
              label: "Team",
              onPress: () =>
                this.handleTeamPress(navigation, tournamentId, refresh)
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

export default CreateButton;
