import * as errors from "./errors";
import Authentication from "./Authentication";

var APIConfig = require("./config");

export default class RefereeAPI {
  static async getReferees(tournamentId) {
    const res = await fetch(
      `${APIConfig.backendURL}/tournaments/id/${tournamentId}/referees`,
      {
        method: "GET",
        headers: await Authentication.withJWT()
      }
    );
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.referees;
  }

  static async addReferee(tournamentId, email) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(
      `${APIConfig.backendURL}/tournaments/id/${tournamentId}/referees/add`,
      {
        method: "POST",
        headers: await Authentication.withJWT(),
        body: JSON.stringify({ email })
      }
    );
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.addSuccess;
  }

  static async removeReferee(tournamentId, email) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(
      `${APIConfig.backendURL}/tournaments/id/${tournamentId}/referees/remove`,
      {
        method: "POST",
        headers: await Authentication.withJWT(),
        body: JSON.stringify({ email })
      }
    );
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.removeSuccess;
  }

  static async isReferee(tournamentId, email) {
    if (!Authentication.loggedIn()) return false;
    let refereeList = await this.getReferees(tournamentId);
    return (
      refereeList
        .map(function(d) {
          return d["userEmail"];
        })
        .indexOf(email) > -1
    );
  }
}
