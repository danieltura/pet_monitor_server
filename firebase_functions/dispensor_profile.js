function dispensorProfile(data) {
  return {
    id: data.id,
    userId: data.userId,
    sensorId: data.sensorId,
    schedules: data.schedules.map((item, index) => {
      item.id = index;
      return item;
    }),
  };
}

module.exports = dispensorProfile;
