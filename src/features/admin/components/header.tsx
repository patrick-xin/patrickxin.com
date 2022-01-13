import { useLogout } from "../hooks";

const DashboardHeader = () => {
  const { logout, isLoading } = useLogout();
  return (
    <header className="h-16 md:h-24 w-full ">
      <nav
        className="grid grid-cols-2 max-w-6xl mx-auto lg:grid-cols-6 items-center h-full w-full
       px-8 md:px-12 lg:px-24"
      >
        <div className="col-start-4 col-span-4 flex">
          <ul className="hidden lg:flex justify-around items-center flex-1">
            <li>
              <button
                className="border border-accent text-sm rounded p-2"
                onClick={() => {
                  logout();
                }}
              >
                {isLoading ? "logging out" : "logout"}
              </button>
            </li>
            <li>
              <div></div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
