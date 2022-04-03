function userProfile(data) {
  return {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  };
}

module.exports = userProfile;
