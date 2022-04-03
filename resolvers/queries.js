import userProfile from "../firebase_functions/user_profile";
import cameraProfile from "../firebase_functions/camera_profile";
import dispensorProfile from "../firebase_functions/dispensor_profile";

export const getAllUsers = async (_, __, { dataSources: { users } }) => {
  const res = await users.getAllUsers();
  const keys = Object.keys(res);
  return keys.map((item) => userProfile({ ...res[item], id: item }));
};

export const getCameras = async (_, __, { dataSources: { cameras } }) => {
  const res = await cameras.getAllCameras();
  const keys = Object.keys(res);
  return keys.map((item) => cameraProfile(res[item], cameras));
};

export const getDispensors = async (_, __, { dataSources: { dispensors } }) => {
  const res = await dispensors.getAllDispensors();
  const keys = Object.keys(res);
  return keys.map((item) => dispensorProfile({ ...res[item], id: item }));
};

export const getSensorStatus = async (_, __, { dataSources: { sensor } }) => {
  return sensor.getSensor();
};
