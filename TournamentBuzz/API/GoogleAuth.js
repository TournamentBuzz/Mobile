import { AppAuth } from "expo";
import { AsyncStorage, Platform } from "react-native";

const osKey =
  Platform.OS === "ios"
    ? "802305630809-0cv268h0586cnhn5lro0cf0f0hr1ldi8.apps.googleusercontent.com" // ios key
    : "802305630809-8j93ohaaifcjl9obeq1r1a38irlmhr8a.apps.googleusercontent.com"; // android key

const config = {
  issuer: "https://accounts.google.com",
  scopes: ["openid", "profile", "email"],
  clientId: osKey
};

const StorageKey = "@Tournamentbuzz:GoogleOAuthKey";

export default class GoogleAuth {
  static async signInAsync() {
    const authState = await AppAuth.authAsync(config);
    await this.cacheAuthAsync(authState);
    return authState;
  }

  static cacheAuthAsync(authState) {
    return AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  }

  static async getCachedAuthAsync() {
    const value = await AsyncStorage.getItem(StorageKey);
    const authState = JSON.parse(value);
    if (authState) {
      if (this.checkIfTokenExpired(authState)) {
        return this.refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }
    return null;
  }

  static checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
  }

  static async refreshAuthAsync({ refreshToken }) {
    let authState
    try {
      authState = await AppAuth.refreshAsync(config, refreshToken);
    } catch (err) {
      return null;
    }
    await this.cacheAuthAsync(authState);
    return authState;
  }

  static async signOutAsync({ accessToken }) {
    try {
      await AppAuth.revokeAsync(config, {
        token: accessToken,
        isClientIdProvided: true
      });
      await AsyncStorage.removeItem(StorageKey);
      return null;
    } catch ({ message }) {
      console.log(`Failed to revoke token: ${message}`);
    }
  }
}
