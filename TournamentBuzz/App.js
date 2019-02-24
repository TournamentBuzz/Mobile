import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext, getTheme } from "react-native-material-ui";
import Home from "./views/Home";

const uiTheme = {
  palette: {
    primaryColor: "#b3a369"
  }
};

export default class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Home />
      </ThemeContext.Provider>
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
