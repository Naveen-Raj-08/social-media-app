const phoneVal = /^\d{10}$/;
const emailVal =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordVal =
  /^(?=.*\d)(?!.* )(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const validatePhone = (phone) => {
  if (phoneVal.test(parseInt(phone))) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (email) => {
  if (emailVal.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  if (passwordVal.test(password)) {
    return true;
  } else {
    return false;
  }
};

export const validateUser = (users, currentUser, currentPassword) => {
  var isUserAvailable = false;
  users.map((user) => {
    if (user.data.Usermail === currentUser) {
      if (user.data.Userpassword === currentPassword) {
        isUserAvailable = true;
      }
    }
  });

  return isUserAvailable;
};
