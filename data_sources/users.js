import { RESTDataSource } from "apollo-datasource-rest";

export default class Users extends RESTDataSource {
  constructor(baseURL) {
    super();
    this.baseURL = baseURL;
    this.collName = "users";
  }

  getAllUsers() {
    return this.get(`${this.baseURL}/${this.collName}.json`);
  }

  addUser(userDoc) {
    return this.post(`${this.baseURL}/${this.collName}.json`, userDoc);
  }
}
