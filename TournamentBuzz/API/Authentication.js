import { AsyncStorage } from "react-native";
import * as decode from "jwt-decode";

import * as errors from "./errors";

export default class Authentication {
  static withoutJWT() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  static async withJWt() {
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
