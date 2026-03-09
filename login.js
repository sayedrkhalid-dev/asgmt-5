const LOGIN_STATES = {
  userName: "admin",
  password: "admin123",
  isLoading: false,
  isLoggedIn: false,
  error: {
    userNameError: null,
    passwordError: null,
  },
};

const validateLoginForm = (userName, password) => {
  const login = LOGIN_STATES;

  const errors = {
    userNameError: null,
    passwordError: null,
  };

  if (!userName.trim()) errors.userNameError = "Username is required";
  else if (userName !== login.userName)
    errors.userNameError = "Invalid username";

  if (!password.trim()) errors.passwordError = "Password is required";
  else if (password !== login.password)
    errors.passwordError = "Invalid password";

  return errors;
};

document.getElementById("sign-in-btn").addEventListener("click", (e) => {
  const userName = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;
  const passwordError = document.getElementById("password-error");
  const userNameError = document.getElementById("username-error");

  // Errors handling
  const errors = validateLoginForm(userName, password);
  userNameError.innerText = errors.userNameError;
  passwordError.innerText = errors.passwordError;

  // Re-direct to dashboard
  if (!errors.userNameError && !errors.passwordError)
    location.href = "dashboard.html";
});
