import { AsyncStorage } from "react-native";

import * as errors from "./errors";
import GoogleAuth from "./GoogleAuth";

var APIConfig = require("./config");
var jwtDecode = require("jwt-decode");

export default class Authentication {
  static async login() {
    const result = await GoogleAuth.signInAsync();
    const gToken = result.idToken;
    const res = await fetch(`${APIConfig.backendURL}/user/google-auth`, {
      method: "POST",
      headers: await this.withoutJWT(),
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

  static async refreshJWT(gToken) {
    const res = await fetch(`${APIConfig.backendURL}/user/google-auth`, {
      method: "POST",
      headers: await this.withoutJWT(),
      body: JSON.stringify({ gToken })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    await this.setToken(json.jwt);
    return;
  }

  static withoutJWT() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  static async withJWT() {
    if (!(await this.loggedIn())) {
      return this.withoutJWT();
    }
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
      const decoded = jwtDecode(userToken);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  }

  static async loggedIn() {
    const token = await this.getToken();
    if (Boolean(token)) {
      if (this.isTokenExpired(token)) {
        const result = await GoogleAuth.getCachedAuthAsync();
        if (result === null) {
          return false;
        }
        try {
          await this.refreshJWT(result.idToken);
          return true;
        } catch (err) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static async getUID() {
    if (!(await this.loggedIn())) {
      return null;
    }
    const token = await this.getToken();
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (err) {
      return null;
    }
  }
}
