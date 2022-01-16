import { motion } from "framer-motion";

interface SearchScreenProps {
  closeSearch(): void;
}

const SearchScreen = ({ closeSearch }: SearchScreenProps) => {
  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      exit={{ y: -1000 }}
      transition={{ type: "tween", duration: 1 }}
      className="fixed z-100 inset-0 bg-black h-screen w-screen text-white"
    >
      <div className="relative flex flex-col justify-between h-full">
        <h1 className="text-2xl col-span-5 text-center h-12 p-4">
          Good On You
        </h1>
        <div
          className="cursor-pointer flex justify-end absolute right-4 top-4"
          onClick={closeSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <form className="mx-auto w-full -mb-16">
          <input
            className="appearance-none focus:outline-none flex justify-center text-center placeholder-main-gray/20 bg-transparent p-4 w-full text-5xl"
            placeholder="Search Articles..."
          />
        </form>
      </div>
    </motion.div>
  );
};

export default SearchScreen;
