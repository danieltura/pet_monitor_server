function cameraProfile(data) {
  return {
    userId: data.userId,
    sensorId: data.sensorId,
    photoId: data.photoId,
    dispensorId: data.dispensorId,
  };
}

module.exports = cameraProfile;
