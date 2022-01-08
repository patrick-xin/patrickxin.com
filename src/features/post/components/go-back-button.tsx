import Link from "next/link";

import { ArrowLeftIcon } from "@heroicons/react/solid";

type GoBackButtonProps = {
  path: string;
  title: string;
};

const GoBackButton = ({ path, title }: GoBackButtonProps) => {
  return (
    <button
      type="button"
      className="inline-flex gap-2 items-center group mb-4 z-100"
    >
      <ArrowLeftIcon className="h-4 w-4 md:h-6 md:w-6 text-orange dark:text-mint" />
      <Link href={`${path}`}>
        <a className="group-hover:underline dark:text-gray-500 text-sm md:text-base underline-offset-4 decoration-2 transition-all ease-linear decoration-orange dark:decoration-mint">
          Go back to {title}
        </a>
      </Link>
    </button>
  );
};

export default GoBackButton;
