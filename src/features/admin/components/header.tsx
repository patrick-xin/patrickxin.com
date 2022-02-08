import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

import { ThemeToggle } from "@/common/components";
import { ADMIN_ROUTES } from "@/common/constants";
import { useLogout } from "../hooks";
import { SpinLoader } from "@/common/components/icon";

const DashboardHeader = () => {
  const { logout, isLoading } = useLogout();
  const router = useRouter();

  return (
    <header className="h-16 md:h-24 w-full mb-12 flex items-center">
      <nav className="w-full">
        <ul className="flex justify-between items-center flex-1 max-w-4xl mx-auto">
          {ADMIN_ROUTES.map((route) => (
            <li key={route.path}>
              <Link href={`${route.path}`}>
                <a
                  className={cn(
                    "hover:text-orange  dark:hover:text-mint transition-colors ease-linear",
                    {
                      "underline underline-offset-2 decoration-orange dark:decoration-mint decoration-4":
                        route.exact === true
                          ? route.path === router.asPath
                          : router.asPath.endsWith(route.path),
                    }
                  )}
                >
                  {route.label}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <button
              className="dark:bg-mint bg-orange px-1 py-2 w-20 rounded"
              onClick={() => logout()}
            >
              {isLoading ? <SpinLoader /> : "logout"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardHeader;
