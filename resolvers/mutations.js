import { success, InternalError } from "./responses";
import userProfile from "../firebase_functions/user_profile";
/*
  This file is comprised of functions that resolve the server requests. 
  Our project intention is to enable pet owners to monitor and dispense food remotely. 
  The first part of all functions is to intake input from the client and prepare the data. 
  The second part is to add it firebase database.  
*/

//add user to firebase database
export const addUser = async (_, { input }, { dataSources: { users } }) => {
  //The API end point recieve user inputs down below
  const userDoc = {
    email: input.email,
    fullName: input.firstName + " " + input.lastName,
    firstName: input.firstName,
    lastName: input.lastName,
    password: input.password,
  };

  const docs = await users.getAllUsers();
  const keys = Object.keys(docs);
  const all_users = keys.map((item) =>
    userProfile({ ...docs[item], id: item })
  );

  for (const user of all_users) {
    if (user.email === userDoc.email)
      return InternalError("Email Already Exist");
  }

  //The data source provide a user class that has a method to add user.
  //It basically dump the userDoc JSON entities
  const res = await users.addUser(userDoc);
  if (res && res.name)
    return success("User Added Successfully", { id: res.name });
  return InternalError("Failed To Add User");
};

//add camera to firebase database
export const addCamera = async (
  _,
  { input },
  { dataSources: { users, cameras } }
) => {
  //The API end point recieve camera inputs down below
  const cameraDoc = {
    userId: input.userId,
    sensorId: input.sensorId,
    photoId: input.photoId,
    dispensorId: input.dispensorId,
  };

  //The Camera class input has a method to add camera.
  //The cameraDoc now timestamp and addCamera method append it to the camera document
  const res = await cameras.addCamera(cameraDoc);
  if (res && res.name) return success("Camera Added Successfully");
  return InternalError("Failed To Camera User");
};

//add dispensor to firebase database
//It follows the same patern above
export const addDispensor = async (
  _,
  { input },
  { dataSources: { users, dispensors } }
) => {
  const dispensorDoc = {
    userId: input.userId,
    sensorId: input.sensorId,
    schedules: [],
  };

  const docs = await users.getAllUsers();
  const keys = new Set(Object.keys(docs));
  if (!keys.has(dispensorDoc.userId))
    return InternalError("The user id provided not found");

  const res = await dispensors.addDispensor(dispensorDoc);
  if (res && res.name) return success("Dispensor Added Successfully");
  return InternalError("Failed To Dispensor User");
};

export const dispenseNow = async (
  _,
  { dispensorId, duration },
  { dataSources: { users, dispensors } }
) => {
  const dispensorDocs = await dispensors.getAllDispensors();
  if (!dispensorDocs[dispensorId]) {
    // return error if the dispensory id doesn't exist
    return InternalError("Provided dispensor Id Not Found");
  }

  //Append the schedule to a dispensory document
  const dispDoc = dispensorDocs[dispensorId];
  dispDoc.now = [true, duration];
  const res = await dispensors.addSchedule(dispensorId, dispDoc);
  if (res) return success("Dispensor Scheduled for the next run");
};

export const dispenseNowDone = async (
  _,
  { dispensorId, duration },
  { dataSources: { users, dispensors } }
) => {
  const dispensorDocs = await dispensors.getAllDispensors();
  if (!dispensorDocs[dispensorId]) {
    // return error if the dispensory id doesn't exist
    return InternalError("Provided dispensor Id Not Found");
  }

  //Append the schedule to a dispensory document
  const dispDoc = dispensorDocs[dispensorId];
  delete dispDoc.now;
  const res = await dispensors.addSchedule(dispensorId, dispDoc);
  if (res) return success("Dispensor Scheduled next run is removed");
};

export const takePhoto = async (
  _,
  { cameraId },
  { dataSources: { cameras } }
) => {
  return success("Photo Taken");
};

export const removeSchedule = async (
  _,
  { dispensorId, scheduleId },
  { dataSources: { dispensors } }
) => {
  const dispensorDocs = await dispensors.getAllDispensors();
  if (!dispensorDocs[dispensorId]) {
    // return error if the dispensory id doesn't exist
    return InternalError("Provided Dispensor Id Not Found");
  }
  const dispDoc = dispensorDocs[dispensorId];
  if (dispDoc.schedules.length < dispDoc.schedules) {
    return InternalError("Provided ScheduleId Not Found");
  }
  dispDoc.schedules.splice(scheduleId, 1);
  const res = await dispensors.addSchedule(dispensorId, dispDoc);
  if (res) return success("Dispensor Schedule Removed");

  return InternalError("Failed To Remove Schedule");
};

export const updateSchedule = async (
  _,
  { dispensorId, scheduleId, schedule },
  { dataSources: { dispensors } }
) => {
  const dispensorDocs = await dispensors.getAllDispensors();
  if (!dispensorDocs[dispensorId]) {
    // return error if the dispensory id doesn't exist
    return InternalError("Provided Dispensor Id Not Found");
  }
  const dispDoc = dispensorDocs[dispensorId];
  if (dispDoc.schedules.length < dispDoc.schedules) {
    return InternalError("Provided ScheduleId Not Found");
  }
  schedule = { ...schedule };

  dispDoc.schedules[scheduleId].duration = schedule.duration;
  dispDoc.schedules[scheduleId].startTime = new Date(
    schedule.startTime
  ).toISOString();
  dispDoc.schedules[scheduleId].repeat = { ...schedule.repeat };

  const res = await dispensors.addSchedule(dispensorId, dispDoc);
  if (res) return success("Dispensor Schedule Removed");
  return InternalError("Failed To Remove Schedule");
};

//add schedule to firebase database
export const addSchedule = async (
  _,
  { input, dispensorId },
  { dataSources: { dispensors } }
) => {
  const schedule = {
    duration: input.duration,
    startTime: new Date(input.startTime).toISOString(),
    repeat: { ...input.repeat },
  };

  //Schedule is part of dispensor document.
  //Before appending schedule we need to make sure the dispensory id provided is valid
  const dispensorDocs = await dispensors.getAllDispensors();
  if (!dispensorDocs[dispensorId]) {
    // return error if the dispensory id doesn't exist
    return InternalError("Provided Dispensor Id Not Found");
  }

  //Append the schedule to a dispensory document
  const dispDoc = dispensorDocs[dispensorId];
  dispDoc.schedules.push(schedule);
  const res = await dispensors.addSchedule(dispensorId, dispDoc);
  if (res) return success("Schedule Added Successfully");
  return InternalError("Failed To Add schedule");
};
