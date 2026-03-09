const BASE = "https://phi-lab-server.vercel.app/api/v1/lab";

// -- State --------------------
const state = {
  issues: [],
  filter: "all",
  query: "",
};

// -- API --------------------
const fetchJSON = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const b = await res.json();
    return await b;
  } catch (err) {
    console.error("Fetch error:", err);
    return { data: [] };
  }
};

// -- Config helpers --------------------
const PRIORITY = {
  high: { bg: "bg-red-100", text: "text-red-600", icon: "fa-angles-up" },
  medium: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "fa-equals" },
  low: { bg: "bg-green-100", text: "text-green-700", icon: "fa-angles-down" },
};

const LABEL = {
  bug: { bg: "bg-red-100", text: "text-red-600", icon: "fa-bug" },
  enhancement: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    icon: "fa-wand-magic-sparkles",
  },
  default: { bg: "bg-gray-100", text: "text-gray-600", icon: "fa-tag" },
};

const getPriority = (priority) =>
  PRIORITY[priority?.toLowerCase()] ?? PRIORITY.low;
const getLabel = (label) => LABEL[label?.toLowerCase()] ?? LABEL.default;

const formatDate = (d) => {
  if (!d) return "Unknown";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// -- Filtered issues --------------------
const getFiltered = () => {
  const { issues, filter, query } = state;

  return issues
    .filter(
      (issue) => filter === "all" || issue.status?.toLowerCase() === filter,
    )
    .filter((issue) => {
      if (!query) return true;
      const qry = query.toLowerCase();
      return (
        issue.title?.toLowerCase().includes(qry) ||
        issue.description?.toLowerCase().includes(qry) ||
        issue.author?.toLowerCase().includes(qry) ||
        issue.labels?.some((issue) => issue.toLowerCase().includes(qry))
      );
    });
};

// -- Card template --------------------
const createCard = (issue, idx) => {
  const isOpen = issue.status?.toLowerCase() === "open";
  const p = getPriority(issue.priority);
  const firstLabel = issue.labels?.[0];
  const lCfg = getLabel(firstLabel);
  const isEnh = firstLabel?.toLowerCase() === "enhancement";

  const card = document.createElement("div");
  card.className = `card-enter border-t-4 ${isOpen ? "border-green-500" : "border-purple-500"}
    bg-white outline outline-1 outline-neutral-200 rounded-xl p-5 shadow-sm
    hover:shadow-xl cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4`;
  card.style.animationDelay = `${idx * 45}ms`;
  card.addEventListener("click", () => openModal(issue.id));

  card.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-circle-dot text-base ${isOpen ? "text-green-500" : "text-purple-500"}"></i>
        <span class="text-xs font-semibold ${isOpen ? "text-green-600" : "text-purple-600"}">${issue.status ?? "Unknown"}</span>
      </div>
      <span class="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${p.bg} ${p.text}">
        <i class="fa-solid ${p.icon} text-[10px]"></i>
        ${(issue.priority ?? "LOW").toUpperCase()}
      </span>
    </div>

    <h2 class="text-sm font-bold text-neutral-900 leading-snug line-clamp-2">${issue.title ?? "Untitled"}</h2>
    <p class="text-xs text-neutral-500 leading-relaxed line-clamp-2">${issue.description ?? ""}</p>

    <div class="flex gap-2 flex-wrap">
      <span class="flex items-center gap-1 text-[11px] px-2 py-1 rounded-full font-semibold ${lCfg.bg} ${lCfg.text}">
        <i class="fa-solid ${lCfg.icon} text-[10px]"></i>
        ${firstLabel ?? "No label"}
      </span>
      ${
        !isEnh
          ? `<span class="flex items-center gap-1 text-[11px] px-2 py-1 rounded-full font-semibold bg-amber-100 text-amber-700">
        <i class="fa-solid fa-life-ring text-[10px]"></i> Help wanted
      </span>`
          : ""
      }
    </div>

    <div class="flex justify-between text-[11px] text-neutral-400 pt-3 border-t border-neutral-100">
      <span><i class="fa-solid fa-user w-3.5 mr-1 text-neutral-300"></i>Author: <span class="font-semibold text-neutral-600">${issue.author ?? "Unknown"}</span></span>
      <span><i class="fa-solid fa-calendar w-3.5 mr-1 text-neutral-300"></i>Created: <span class="font-semibold text-neutral-600">${formatDate(issue.createdAt)}</span></span>
    </div>
  `;

  return card;
};

// -- Render issues --------------------
const renderIssues = (issues) => {
  const container = document.getElementById("issue-cards-container");
  const loader = document.getElementById("loading-bar");
  const empty = document.getElementById("empty-state");
  const countEl = document.getElementById("total-issue");

  loader.classList.add("hidden");

  if (!issues.length) {
    empty.classList.replace("hidden", "flex");
    container.innerHTML = "";
    countEl.textContent = "0 Issues";
    return;
  }

  empty.classList.replace("flex", "hidden");

  const label =
    state.filter === "all"
      ? "Issues"
      : `${state.filter.charAt(0).toUpperCase() + state.filter.slice(1)} Issues`;

  countEl.textContent = `${issues.length} ${label}`;
  container.replaceChildren(...issues.map((issue, i) => createCard(issue, i)));
};

const showLoading = () => {
  document.getElementById("loading-bar").classList.remove("hidden");
  document.getElementById("issue-cards-container").replaceChildren();
  document.getElementById("empty-state").classList.replace("flex", "hidden");
  document.getElementById("total-issue").textContent = "Loading...";
};

// -- Tabs --------------------
document.getElementById("issue-tabs").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tab]");
  if (!btn) return;

  document
    .querySelectorAll("#issue-tabs [data-tab]")
    .forEach((t) => t.classList.remove("tab-active"));
  btn.classList.add("tab-active");

  state.filter = btn.dataset.tab;
  renderIssues(getFiltered());
});

// ── Search --------------------
let searchTimer;
document
  .getElementById("search-input")
  .addEventListener("input", ({ target }) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = target.value.trim();
      renderIssues(getFiltered());
    }, 300);
  });

// -- Modal --------------------
const MODAL_LABEL = {
  bug: {
    img: "./assets/BugDroid.svg",
    bg: "bg-red-50",
    text: "text-red-500",
    border: "border-red-200",
  },
  enhancement: {
    img: "./assets/Sparkle.svg",
    bg: "bg-blue-50",
    text: "text-blue-500",
    border: "border-blue-200",
  },
};

const MODAL_PRIORITY_COLOR = {
  high: "bg-red-500 text-white",
  medium: "bg-yellow-400 text-white",
  low: "bg-green-500 text-white",
};

const makeLabelPill = (label) => {
  const labelName = MODAL_LABEL[label.toLowerCase()] ?? {
    img: null,
    bg: "bg-gray-50",
    text: "text-gray-500",
    border: "border-gray-200",
  };
  const icon = labelName.img
    ? `<img src="${labelName.img}" class="w-3.5 h-3.5" />`
    : `<i class="fa-solid fa-tag text-[10px]"></i>`;
  return `<span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wide ${labelName.bg} ${labelName.text} ${labelName.border}">
    ${icon}${label}
  </span>`;
};

const openModal = async (id) => {
  document.getElementById("modal-overlay").classList.replace("hidden", "flex");
  document.body.style.overflow = "hidden";

  const cached = state.issues.find((i) => i.id === id);
  if (cached) populateModal(cached);

  const { data } = await fetchJSON(`${BASE}/issue/${id}`);
  if (data) populateModal(data);
};

const populateModal = (issue) => {
  const isOpen = issue.status?.toLowerCase() === "open";
  const p = getPriority(issue.priority);

  // Title
  document.getElementById("modal-title").textContent =
    issue.title ?? "Untitled Issue";

  // Status pill
  const statusEl = document.getElementById("modal-status");
  statusEl.className = `inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${isOpen ? "bg-green-500 text-white" : "bg-purple-500 text-white"}`;
  statusEl.innerHTML = `<i class="fa-solid ${isOpen ? "fa-circle-dot" : "fa-circle-check"}"></i>${isOpen ? "Opened" : "Closed"}`;

  // "Opened by author • DD/MM/YYYY"
  const dateStr = formatDate(issue.updatedAt);
  document.getElementById("modal-meta-line").textContent =
    `${isOpen ? "Opened" : "Closed"} by ${issue.author ?? "Unknown"} • ${dateStr}`;

  // Label pills
  const labels = issue.labels ?? [];
  const isEnh = labels[0]?.toLowerCase() === "enhancement";
  const helpPill = !isEnh
    ? `<span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wide bg-amber-50 text-amber-600 border-amber-200">
        <img src="./assets/Lifebuoy.svg" class="w-3.5 h-3.5" />Help Wanted
       </span>`
    : "";

  document.getElementById("modal-labels").innerHTML =
    (labels.map(makeLabelPill).join("") || makeLabelPill("No label")) +
    helpPill;

  // Description
  document.getElementById("modal-description").textContent =
    issue.description ?? "No description provided.";

  // Assignee
  document.getElementById("modal-assignee").textContent =
    issue.assignee ?? "Unassigned";

  // Priority pill
  const prioEl = document.getElementById("modal-priority");
  const prioColor =
    MODAL_PRIORITY_COLOR[issue.priority?.toLowerCase()] ??
    MODAL_PRIORITY_COLOR.low;
  prioEl.className = `inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full ${prioColor}`;
  prioEl.innerHTML = `<i class="fa-solid ${p.icon}"></i>${(issue.priority ?? "Low").toUpperCase()}`;
};

const closeModal = () => {
  document.getElementById("modal-overlay").classList.replace("flex", "hidden");
  document.body.style.overflow = "";
};

document.getElementById("modal-close").addEventListener("click", closeModal);
document
  .getElementById("modal-overlay")
  .addEventListener("click", ({ target, currentTarget }) => {
    if (target === currentTarget) closeModal();
  });
document.addEventListener("keydown", ({ key }) => {
  if (key === "Escape") closeModal();
});

// -- Init --------------------
const init = async () => {
  showLoading();
  const { data } = await fetchJSON(`${BASE}/issues`);
  state.issues = data ?? [];
  renderIssues(getFiltered());
};

init();
