export const validateEmail = email => {
  const emailExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email || email === '' || !emailExp.test(email)) {
    return false;
  }

  return true;
};
