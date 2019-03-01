import * as errors from "./errors";
import Authentication from "./Authentication";

var APIConfig = require("./config");

export default class TournamentAPI {
  static async getTournaments() {
    const res = await fetch(`${APIConfig.backendURL}/tournaments`, {
      method: "GET",
      headers: Authentication.withoutJWT()
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournaments;
  }

  static async getTournament(id) {
    const res = await fetch(`${APIConfig.backendURL}/tournaments/id/${id}`, {
      method: "GET",
      headers: Authentication.withoutJWT()
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournament;
  }
}
