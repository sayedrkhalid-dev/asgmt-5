const NavBar = () => {
  return `
    <nav class="navbar bg-neutral-100 shadow-sm px-8">
      <div class="flex flex-1 gap-2">
        <div class="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="./assets/github-logo.png"
            alt="GitHub Logo"
            class="w-full h-full object-cover"
          />
        </div>
        <a class="text-xl hidden md:block">GitHub Issues Tracker</a>
      </div>

      <div class="flex gap-2">
        <input
          type="text"
          placeholder="Search issues..."
          class="input input-bordered w-24 md:w-auto"
        />
        <button class="btn btn-primary bg-blue-600 text-neutral-50">
          + New Issue
        </button>
      </div>
    </nav>
  `;
};

export default NavBar;
