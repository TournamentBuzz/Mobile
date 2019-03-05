import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./views/Main";
import TournamentDetails from "./views/TournamentDetails";
import TeamDetails from "./views/TeamDetails";
import MatchDetails from "./views/MatchDetails";
import TeamCreate from "./views/TeamCreate";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#b3a369"
  }
};

const AppNavigator = createStackNavigator(
  {
    Home: Main,
    TournamentDetails: TournamentDetails,
    TeamDetails: TeamDetails,
    MatchDetails: MatchDetails,
    TeamCreate: TeamCreate
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    );
  }
}
