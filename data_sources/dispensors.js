import { RESTDataSource } from "apollo-datasource-rest";
import { ref, set } from "firebase/database";

export default class Dispensors extends RESTDataSource {
  constructor(baseURL, database) {
    super();
    this.baseURL = baseURL;
    this.collName = "dispensors";
    this.database = database;
  }

  getAllDispensors() {
    return this.get(`${this.baseURL}/${this.collName}.json`);
  }

  async addSchedule(dispensorId, dispensor) {
    return set(ref(this.database, this.collName + "/" + dispensorId), dispensor)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  addDispensor(dispensorDoc) {
    return this.post(`${this.baseURL}/${this.collName}.json`, dispensorDoc);
  }
}
