import * as errors from "./errors";
import Authentication from "./Authentication";

var APIConfig = require("./config");

export default class MatchAPI {
  static async getMatches(tournamentID) {
    let authHeader;
    if (Authentication.loggedIn()) {
      authHeader = await Authentication.withJWT();
    } else {
      authHeader = Authentication.withoutJWT();
    }
    const res = await fetch(
      `${APIConfig.backendURL}/tournaments/id/${tournamentID}/matches/`,
      {
        method: "GET",
        headers: authHeader
      }
    );

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.matches;
  }

  static async getMatch(matchID) {
    let authHeader;
    if (Authentication.loggedIn()) {
      authHeader = await Authentication.withJWT();
    } else {
      authHeader = Authentication.withoutJWT();
    }
    const res = await fetch(`${APIConfig.backendURL}/matches/id/${matchID}`, {
      method: "GET",
      headers: authHeader
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.match;
  }

  static async submitMatchScore(matchID, scoreA, scoreB, winner) {
    if (!(await Authentication.loggedIn())) return;
    const authHeader = await Authentication.withJWT();
    const res = await fetch(
      `${APIConfig.backendURL}/matches/id/${matchID}/submit`,
      {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          scoreA,
          scoreB,
          winner
        })
      }
    );
    if (res.ok) {
      const json = await res.json();
      return json.scoreSubmitSuccess;
    } else {
      throw new errors.UnexpectedError();
    }
  }
}
