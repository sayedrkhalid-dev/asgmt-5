import { getState, setState } from "../state/state.js";

const validateLoginForm = (userName, password) => {
  const state = getState();
  const errors = { userNameError: null, passwordError: null };

  // Username validation
  if (userName === "") errors.userNameError = "Username is required";
  else if (userName !== state.login.userName)
    errors.userNameError = "Invalid username";

  // Password validation
  if (password === "") errors.passwordError = "Password is required";
  else if (password !== state.login.password)
    errors.passwordError = "Invalid password";

  return errors;
};

export { validateLoginForm };
