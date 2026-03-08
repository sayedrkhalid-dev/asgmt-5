const IssueCard = ({ issue }) => {
  return `
    <!-- Issue Card -->
    <div
      class="border-t-4  ${issue.status.toLowerCase() === "open" ? "border-green-600" : "border-purple-600"} max-w-sm bg-neutral-50 outline outline-neutral-200  rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
    >
      <!-- Card Top -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="tooltip hover:tooltip-open transition-all tooltip-right ${issue.priority.toLowerCase() === "high" ? "tooltip-error" : issue.priority.toLowerCase() === "medium" ? "tooltip-warning" : "tooltip-success"}"
            data-tip="${issue.priority.toUpperCase()}"
          >
            <div
              class="hover:animate-[custom-spin_1s_ease-in-out] cursor-pointer"
            >
              <img
                src="./assets/Status.svg"
                alt="Status"
                class="w-7 h-7"
              />
            </div>
          </div>
        </div>

        <!-- Priority Badge -->
        <span
          class="${issue.priority.toLowerCase() === "high" ? "bg-red-200 text-red-600" : issue.priority.toLowerCase() === "medium" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-600"} text-xs font-semibold px-2 py-1 rounded-lg"
        >
          ${issue.priority.toUpperCase()}
        </span>
      </div>

      <!-- Card Title -->
      <h2 class="text-lg font-semibold text-neutral-900 leading-snug">
        ${issue.title}
      </h2>

      <!-- Card Description -->
      <p class="text-sm text-neutral-500 leading-relaxed">
        ${issue.description}
      </p>

      <!-- Card Tags -->
      <div class="flex gap-2">
        <span
          class="${issue.labels[0]?.toLowerCase() === "bug" ? "bg-red-200 text-red-600" : issue.labels[0]?.toLowerCase() === "enhancement" ? "bg-blue-200 text-blue-600" : "bg-gray-200 text-gray-600"} flex items-center gap-1 text-xs px-2 py-1 rounded-lg uppercase font-semibold"
        >
          <img src="./assets/${issue.labels[0]?.toLowerCase() === "bug" ? "BugDroid.svg" : issue.labels[0]?.toLowerCase() === "enhancement" ? "Sparkle.svg" : "NoLabel.svg"}" class="w-4 h-4" />
          ${issue.labels[0] ?? "No label"}
        </span>

        <span
          class="${
            issue.labels[0]?.toLowerCase() === "enhancement" ? "hidden" : "flex"
          } items-center gap-1 text-xs px-2 py-1 rounded-lg bg-yellow-200 text-yellow-800 uppercase font-semibold"
        >
          <img src="./assets/Lifebuoy.svg" class="w-4 h-4" />
          Help wanted
        </span>
      </div>

      <!-- Card Footer -->
      <div
        class="flex flex-col text-xs text-neutral-500 pt-3 border-t border-neutral-300"
      >
        <span>Author: ${issue.author ?? "Unknown"}</span>
        <span>Assignee: ${issue.assignee ?? "Unknown"}</span>
        <span>Created: ${issue.created_at ?? "Unknown"}</span>
        <span>Updated: ${issue.updated_at ?? "Unknown"}</span>
      </div>
    </div>
  `;
};

export default IssueCard;
