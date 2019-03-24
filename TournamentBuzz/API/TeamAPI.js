import * as errors from "./errors";
import Authentication from "./Authentication";

var APIConfig = require("./config");

export default class TeamAPI {
  static async createTeam(tournamentId, teamName) {
    if (!(await Authentication.loggedIn())) return;
    const res = await fetch(
      `${APIConfig.backendURL}/tournaments/id/${tournamentId}/teams/create`,
      {
        method: "POST",
        headers: await Authentication.withJWT(),
        body: JSON.stringify({ teamName })
      }
    );
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.teamId;
  }

  static async withdrawTeam(tournamentId, teamId) {
    if (!(await Authentication.loggedIn())) return;
    const res = await fetch(
      `${APIConfig.backendURL}/tournaments/id/${tournamentId}/teams/withdraw`,
      {
        method: "POST",
        headers: Authentication.withJWT(),
        body: JSON.stringify({ teamId })
      }
    );

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.withdrawStatus;
  }

  static async inviteToTeam(teamId, email) {
    const res = await fetch(`${APIConfig.backendURL}/teams/invite`, {
      method: "POST",
      headers: await Authentication.withJWT(),
      body: JSON.stringify({ teamId, email })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.inviteStatus;
  }

  static async removeFromTeam(teamId, email) {
    const res = await fetch(`${APIConfig.backendURL}/teams/remove`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId, email })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.kickStatus;
  }

  static async promote(teamId, email) {
    const res = await fetch(`${APIConfig.backendURL}/teams/promote`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId, email })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.promoteStatus;
  }

  static async getTeams(tournamentId) {
    const res = await fetch(
      `${APIConfig.backendURL}/tournaments/id/${tournamentId}/teams`,
      {
        method: "GET",
        headers: Authentication.withJWT()
      }
    );
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.teams;
  }

  static async getTeam(teamId) {
    const res = await fetch(`${APIConfig.backendURL}/teams/id/${teamId}`, {
      method: "GET",
      headers: Authentication.withJWT()
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.team;
  }

  static async getTeamMembers(teamId) {
    const res = await fetch(
      `${APIConfig.backendURL}/teams/id/${teamId}/members`,
      {
        method: "GET",
        headers: Authentication.withoutJWT()
      }
    );

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.members;
  }

  static async getPendingInvites() {
    if (!(await Authentication.loggedIn())) return;
    const res = await fetch(`${APIConfig.backendURL}/invites`, {
      method: "GET",
      headers: await Authentication.withJWT()
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.team;
  }

  static async acceptInvite(teamId) {
    if (!(await Authentication.loggedIn())) return;
    const res = await fetch(`${APIConfig.backendURL}/invites/accept`, {
      method: "POST",
      headers: await Authentication.withJWT(),
      body: JSON.stringify({ teamId })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.acceptStatus;
  }

  static async declineInvite(teamId) {
    if (!(await Authentication.loggedIn())) return;
    const res = await fetch(`${APIConfig.backendURL}/invites/decline`, {
      method: "POST",
      headers: await Authentication.withJWT(),
      body: JSON.stringify({ teamId })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.declineStatus;
  }

  static async getPlayerList() {
    if (!(await Authentication.loggedIn())) return;
    const res = await fetch(`${APIConfig.backendURL}/user`, {
      method: "GET",
      headers: await Authentication.withJWT(),
    });
    if (!res.ok) {
      console.log(res);
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.users;
  }

  static async payForTeam(teamId, token) {
    const res = await fetch(`${APIConfig.backendURL}/teams/charge`, {
      method: "POST",
      headers: await Authentication.withJWT(),
      body: JSON.stringify({ teamId, token })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.paymentStatus;
  }
}
