import {
  getAllUsers,
  getSensorStatus,
  getCameras,
  getDispensors,
} from "../resolvers/queries";
import {
  addUser,
  addCamera,
  dispenseNowDone,
  addDispensor,
  addSchedule,
  dispenseNow,
  takePhoto,
  removeSchedule,
  updateSchedule,
} from "../resolvers/mutations";
import { GraphQLDateTime } from "graphql-iso-date";

const not_implemented = () => "Not Implemented Yet";
const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    users: getAllUsers,
    getSensorStatus,
    dispensors: getDispensors,
    cameras: getCameras,
  },

  Mutation: {
    addUser,
    // updateUser: not_implemented,
    addCamera,
    addSchedule,
    // updateCamera: not_implemented,
    addDispensor,
    // updateSchedule: not_implemented,
    dispenseNow,
    dispenseNowDone,
    takePhoto,
    removeSchedule,
    updateSchedule,
  },
};

export default resolvers;
