const IssueTabs = (tab) => {
  return `
    <!-- Issue Tab buttons -->
    <div class="bg-neutral-100 flex gap-2 rounded-lg p-4 shadow-xl">
      <button
        class="${tab === "all" ? "tab-active" : ""} w-[100px] py-2 border border-neutral-400 hover:border-blue-600 transition-all rounded cursor-pointer text-sm text-neutral-600 hover:tbluet6al-800 font-semibold"
      >
        All
      </button>
      <button
        class="${tab === "open" ? "tab-active" : ""} w-[100px] py-2 border border-neutral-400 hover:border-blue-600 transition-all rounded cursor-pointer text-sm text-neutral-600 hover:text-blue-600 font-semibold"
      >
        Open
      </button>
      <button
        class="${tab === "closed" ? "tab-active" : ""} w-[100px] py-2 border border-neutral-400 hover:border-blue-600 transition-all rounded cursor-pointer text-sm text-neutral-600 hover:text-blue-600 font-semibold"
      >
        Closed
      </button>
    </div>
  `;
};

export default IssueTabs;
