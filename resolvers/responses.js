export const success = (message, props) => {
  return {
    code: "200",
    success: true,
    message,
    ...props,
  };
};

export const InternalError = (message) => {
  return {
    code: "500",
    success: false,
    message: message ? message : "Internal Error",
  };
};

export const alreadyExists = (type, value) => {
  return {
    code: "422",
    success: false,
    message: `${type} '${value}' already exists.`,
  };
};
