export default class Authentication {
  static withoutJWT() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }
}
