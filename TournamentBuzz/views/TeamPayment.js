import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import {
  Title,
  ActivityIndicator,
  Divider,
  TextInput,
  Button,
  Portal,
  Modal
} from "react-native-paper";
import { CreditCardInput } from "react-native-credit-card-input";

import Container from "../components/Container";
import TeamAPI from "../API/TeamAPI";

var stripe = require("stripe-client")("pk_test_X20OBRj4crG53yFIaOaoKOMw");

const paymentStyles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class TeamPayment extends Component {
  static navigationOptions = { headerStyle: { backgroundColor: "#b3a369" } };
  constructor(props) {
    super(props);
    this.state = {
      formError: "",
      teamId: this.props.navigation.getParam("teamId", null),
      entryCost: this.props.navigation.getParam("entryCost", null),
      validInput: false,
      cardName: "",
      cardNumber: "",
      cvc: "",
      exp_month: "",
      exp_year: "",
      processing: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  async handleFormSubmit() {
    if (this.state.teamId !== null && this.state.entryCost !== null) {
      if (this.state.validInput) {
        this.setState({ processing: true });
        const information = {
          card: {
            number: this.state.cardNumber,
            exp_month: this.state.exp_month,
            exp_year: this.state.exp_year,
            cvc: this.state.cvc,
            name: this.state.cardName
          }
        };
        var card = await stripe.createToken(information);
        var token = card.id;
        try {
          await TeamAPI.payForTeam(this.state.teamId, token);
          this.props.navigation.goBack();
          return;
        } catch (error) {
          // charge unsuccessful
          console.log("Charge failed");
        }
      } else {
        console.log("Incomplete information");
        // show incomplete error
      }
    }
  }

  _onChange(form) {
    const cardNumber = form.values.number.split(" ").join("");
    let exp_month = "";
    let exp_year = "";
    if (form.status.expiry === "valid") {
      exp_month = form.values.expiry.split("/")[0];
      exp_year = form.values.expiry.split("/")[1];
    }
    this.setState({
      validInput: form.valid,
      cardName: form.values.name,
      cardNumber: cardNumber,
      cvc: form.values.cvc,
      exp_month: exp_month,
      exp_year: exp_year
    });
  }

  render() {
    return (
      <Container>
        <Portal>
          <View style={paymentStyles.view}>
            <Modal visible={this.state.processing} dismissable={false}>
              <ActivityIndicator animating={true} />
            </Modal>
          </View>
        </Portal>
        <CreditCardInput onChange={this._onChange} requiresName={true} />
        <Button onPress={this.handleFormSubmit}>Submit</Button>
      </Container>
    );
  }
}

export default TeamPayment;
