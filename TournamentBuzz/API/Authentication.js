import { AsyncStorage } from "react-native";
import * as decode from "jwt-decode";

import * as errors from "./errors";
import GoogleAuth from "./GoogleAuth";

var APIConfig = require("./config");

export default class Authentication {
  static async login() {
    const result = await GoogleAuth.signInAsync();
    const gToken = result.idToken;
    const res = await fetch(`${APIConfig.backendURL}/user/google-auth`, {
      method: "POST",
      headers: await Authentication.withoutJWT(),
      body: JSON.stringify({ gToken })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    await this.setToken(json.jwt);
    return;
  }

  static async logout() {
    const accountKey = JSON.parse(
      await AsyncStorage.getItem("@Tournamentbuzz:GoogleOAuthKey")
    );
    await GoogleAuth.signOutAsync(accountKey);
    await AsyncStorage.removeItem("userToken");
  }

  static withoutJWT() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  static async withJWT() {
    return {
      Authorization: `Bearer ${await this.getToken()}`,
      ...this.withoutJWT()
    };
  }

  static async setToken(userToken) {
    try {
      await AsyncStorage.setItem("userToken", userToken);
    } catch (e) {
      throw new errors.UnexpectedError();
    }
  }

  static async getToken() {
    return await AsyncStorage.getItem("userToken");
  }

  static isTokenExpired(userToken) {
    try {
      const decoded = decode(userToken);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  static async loggedIn() {
    const token = await this.getToken();
    return Boolean(token) && !this.isTokenExpired(token);
  }

  static async getUID() {
    if (!this.loggedIn()) {
      return null;
    }
    const token = await this.getToken();
    try {
      const decoded = decode(token);
      return decoded.id;
    } catch (err) {
      return null;
    }
  }
}
