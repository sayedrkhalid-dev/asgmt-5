import { getState, setState } from "./state/state.js";
import { validateLoginForm } from "./js/login.js";
import { LoginForm } from "./Components/LoginForm.js";
import NavBar from "./Components/NavBar.js";
import IssueTabs from "./Components/IssueTabs.js";
import IssueSummary from "./Components/IssueSummary.js";
import IssueCard from "./Components/IssueCard.js";

const renderLoginForm = (newState) => {
  document.getElementById("app").innerHTML = LoginForm(newState);

  document.getElementById("sign-in-btn").addEventListener("click", () => {
    const userName = document.querySelector('input[type="text"]').value.trim();
    const password = document
      .querySelector('input[type="password"]')
      .value.trim();

    const newState = {
      login: {
        ...getState().login,
        userName,
        password,
        isLoading: true,
        error: validateLoginForm(userName, password),
      },
    };

    setState({
      login: {
        ...getState().login,
        ...newState.login,
      },
    });

    console.log(newState.login);
  });
};

renderLoginForm();

export { renderLoginForm };
