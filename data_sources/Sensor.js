import { RESTDataSource } from "apollo-datasource-rest";

export default class Sensor extends RESTDataSource {
  constructor(baseURL) {
    super();
    this.baseURL = baseURL;
    this.collName = "sensor";
  }

  async getSensor() {
    return this.get(`${this.baseURL}/${this.collName}.json`);
  }

  async updateSensorStatus(status) {
    return this.patch(`${this.baseURL}/${this.collName}.json`, {
      status,
    });
  }
}
