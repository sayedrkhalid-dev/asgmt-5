const loginState = {
  userName: "admin",
  password: "admin123",
  isLoading: false,
  isLoggedIn: false,
  error: {
    userNameError: null,
    passwordError: null,
  },
};

const filtersState = {
  tab: {
    all: true,
    open: false,
    closed: false,
  },
};

const issuesState = {
  issues: [],
  searchedIssues: [],
  isSearching: false,
  isLoading: false,
  selectedIssue: null,
  issueInfoModal: false,
  error: null,
};

const initialState = {
  login: { ...loginState },
  issues: { ...issuesState },
  filters: { ...filtersState },
};

const setState = (newState) => {
  Object.assign(initialState, newState);
};

const getState = () => {
  return initialState;
};

const loadData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const data = await loadData(
  "https://phi-lab-server.vercel.app/api/v1/lab/issues",
);

export { setState, getState, data };
