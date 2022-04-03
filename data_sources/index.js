import Users from "./users";
import Cameras from "./cameras";
import Dispensors from "./dispensors";
import Sensor from "./Sensor";

export default class DataSources {
  constructor(baseUrl, database, storage, auth) {
    this.baseUrl = baseUrl;
    this.database = database;
    this.storage = storage;
    this.auth = auth;
  }

  getAllSources() {
    const users = new Users(this.baseUrl, this.database);
    const cameras = new Cameras(
      this.baseUrl,
      this.database,
      this.storage,
      this.auth
    );
    const dispensors = new Dispensors(this.baseUrl, this.database);
    const sensor = new Sensor(this.baseUrl);
    return { users, sensor, cameras, dispensors };
  }
}
