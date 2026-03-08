const IssueSummary = (issues) => {
  return `
    <!-- Issue Summary -->
    <div
      class="flex justify-between items-center bg-neutral-100 p-4 border-b border-neutral-300 shadow-xl"
    >
      <!-- Issue brief -->
      <div class="flex items-center gap-2">
        <div
          class="w-10 h-10 flex justify-center items-center bg-blue-200 rounded-full"
        >
          <img src="./assets/Aperture.svg" alt="Avatar" />
        </div>

        <div class="flex flex-col">
          <h1 class="text-xl font-semibold">${issues.length} Issues</h1>
          <p class="text-sm text-neutral-500">
            Track and manage your project issues
          </p>
        </div>
      </div>

      <!-- Status Indicators -->
      <div class="flex gap-2">
        <div class="flex gap-2 items-center text-sm font-semibold">
          <div class="w-3 h-3 bg-green-600 rounded-full"></div>
          Open
        </div>
        <div class="flex gap-2 items-center text-sm font-semibold">
          <div class="w-3 h-3 bg-purple-600 rounded-full"></div>
          Closed
        </div>
      </div>
    </div>
  `;
};

export default IssueSummary;
