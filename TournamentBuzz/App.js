import React from "react";
import { StyleSheet, View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Main from "./views/Main";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#b3a369"
  }
};

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
