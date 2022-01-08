import { HeartIcon } from "@heroicons/react/solid";

const Footer = () => {
  return (
    <footer className="flex justify-center text-sm items-center border-t border-orange dark:border-mint/20 h-16 mb-12 md:mb-16 lg:mb-0">
      made with <HeartIcon className="h-4 w-4 text-red-600 mx-3" /> by
      alpesdream
    </footer>
  );
};

export default Footer;
