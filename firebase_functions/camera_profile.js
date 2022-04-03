async function cameraProfile(data, cameras) {
  const url = await cameras.getPhotoUrl(data.photoId);
  return {
    userId: data.userId,
    sensorId: data.sensorId,
    photoId: data.photoId,
    dispensorId: data.dispensorId,
    url,
  };
}

module.exports = cameraProfile;
