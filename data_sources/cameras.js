import { RESTDataSource } from "apollo-datasource-rest";
import { ref, getDownloadURL } from "firebase/storage";

export default class Cameras extends RESTDataSource {
  constructor(baseURL, database, storage, auth) {
    super();
    this.baseURL = baseURL;
    this.collName = "cameras";
    this.database = database;
    this.storage = storage;
    this.auth = auth;
  }

  async getPhotoUrl(image_name) {
    return getDownloadURL(ref(this.storage, image_name));
  }

  getAllCameras() {
    return this.get(`${this.baseURL}/${this.collName}.json`);
  }

  addCamera(cameraDoc) {
    return this.post(`${this.baseURL}/${this.collName}.json`, cameraDoc);
  }
}
