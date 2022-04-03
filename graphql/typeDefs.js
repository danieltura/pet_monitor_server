import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  #############
  # Queries #
  #############
  type User {
    id: ID!
    firstName: String
    lastName: String
    fullName: String
    email: String!
    password: String
  }

  type Days {
    Monday: Boolean!
    Tuesday: Boolean!
    Wednesday: Boolean!
    Thursday: Boolean!
    Friday: Boolean!
    Saturday: Boolean!
    Sunday: Boolean!
  }

  type TriggerTime {
    startTime: Date!
    duration: Int!
    id: Int!
    repeat: Days
  }

  type Dispensor {
    id: String!
    userId: String!
    sensorId: String!
    schedules: [TriggerTime]
  }

  type Camera {
    userId: String!
    sensorId: String!
    photoId: String!
    dispensorId: String!
    url: String
  }

  type Status {
    status: Boolean!
  }

  type Query {
    users: [User]
    dispensors: [Dispensor]
    cameras: [Camera]
    getSensorStatus: Status
  }

  #############
  # Mutations #
  #############

  type MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type UserMutationResponse {
    code: String!
    success: Boolean!
    message: String!
    id: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String
  }

  input CameraInput {
    userId: String!
    sensorId: String!
    photoId: String!
    dispensorId: String!
  }

  input DayInput {
    Monday: Boolean!
    Tuesday: Boolean!
    Wednesday: Boolean!
    Thursday: Boolean!
    Friday: Boolean!
    Saturday: Boolean!
    Sunday: Boolean!
  }

  input TriggerTimeInput {
    startTime: Date!
    duration: Int!
    repeat: DayInput!
  }

  input DispensorInput {
    userId: String!
    sensorId: String!
  }

  type Mutation {
    addUser(input: UserInput!): UserMutationResponse

    addCamera(input: CameraInput): MutationResponse
    takePhoto(cameraId: String!): MutationResponse

    dispenseNow(dispensorId: String!, duration: Int!): MutationResponse
    dispenseNowDone(dispensorId: String!): MutationResponse
    addDispensor(input: DispensorInput): MutationResponse

    addSchedule(
      input: TriggerTimeInput!
      dispensorId: String!
    ): MutationResponse
    updateSchedule(
      dispensorId: String!
      scheduleId: Int!
      schedule: TriggerTimeInput!
    ): MutationResponse
    removeSchedule(dispensorId: String!, scheduleId: Int!): MutationResponse
  }
`;

export default typeDefs;
