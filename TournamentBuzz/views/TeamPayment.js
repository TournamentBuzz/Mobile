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
import { Analytics, PageHit } from "expo-analytics";

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
          this.props.navigation.state.params.refresh();
          this.props.navigation.goBack();
          return;
        } catch (error) {
          // charge unsuccessful
          this.setState({
            formError:
              "An error occured processing your payment. Please check your card information and try again",
            processing: false
          });
        }
      } else {
        // Incomplete Information
        this.setState({ formError: "Please fill out all the fields" });
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
      exp_year: exp_year,
      formError: ""
    });
  }

  componentDidMount() {
    const analytics = new Analytics("UA-138304149-1");
    analytics.hit(new PageHit("TeamPayment"));
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
        <View style={{ marginBottom: 15, marginLeft: 10 }}>
          <Title>Tournament Entry Fee Payment</Title>
          <Text>Cost: ${this.state.entryCost}</Text>
        </View>
        <Text style={{ marginBottom: 10, marginLeft: 10, color: "#FF0000" }}>
          {this.state.formError}
        </Text>
        <CreditCardInput onChange={this._onChange} requiresName={true} />
        <Button onPress={this.handleFormSubmit} style={{ marginTop: 20 }}>
          Submit
        </Button>
      </Container>
    );
  }
}

export default TeamPayment;
