export const LoginForm = (newState) => {
  const {
    userName = "",
    password = "",
    error = {},
    isClicked = false,
  } = newState || {};

  return `
    <div
      id="login-form"
      class="card w-96 bg-base-100 shadow-xl mx-auto py-6"
    >
      <div class="mx-auto">
        <!-- Form top -->
        <div class="mx-auto text-center mb-4">
          <div class="w-16 h-16 mx-auto mb-4">
            <img src="./assets/github-logo.png" alt="Github Logo" />
          </div>
          <h1 class="text-2xl font-bold">Github Issue Tracker</h1>
          <p class="text-sm text-neutral-500">
            Sign in to manage your issues
          </p>
        </div>

        <!-- Form body -->
        <fieldset class="fieldset rounded-box w-xs">
        <!-- Username -->
          <label class="label text-sm text-neutral-500 font-semibold">Username</label>
          <input type="text" value="${userName}" class="input" placeholder="Enter Username" />

          <!-- User name error -->
          <p class="text-xs text-red-500">
            ${isClicked ? (error?.userNameError ?? "") : ""}
          </p>

          <!-- Password -->
          <label class="label text-sm text-neutral-500 font-semibold">Password</label>
          <input type="password" value="${password}" class="input" placeholder="Enter Password" />

          <!-- Password error -->
          <p class="text-xs text-red-500">
            ${isClicked ? (error?.passwordError ?? "") : ""}
          </p>

          <!-- Sign in button -->
          <button id="sign-in-btn" class="btn bg-blue-600 hover:bg-blue-500 text-neutral-50 mt-4">
            Sign In
          </button>

        </fieldset>

        <div class="divider text-sm text-neutral-500">OR</div>

        <!-- Demo credentials -->
        <div class="w-full mx-auto text-center">
          <p class="text-sm text-neutral-500">
            Use demo credentials to log in
          </p>

          <p
            class="text-sm text-neutral-500 border border-neutral-300 rounded-lg p-4 bg-neutral-50 mt-2"
          >
            <span class="text-neutral-800 font-semibold">Username:</span>
            admin <br />
            <span class="text-neutral-800 font-semibold">Password:</span>
            admin123
          </p>
        </div>
      </div>
    </div>
  `;
};

export default LoginForm;
