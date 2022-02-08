import cn from "classnames";
type BlobProps = {
  color: "mint" | "orange" | "purple";
  className?: string;
  isReverse?: boolean;
};

const Blob = ({ color, className, isReverse = false }: BlobProps) => {
  const variants = {
    color: {
      mint: "text-mint/70",
      orange: "text-orange/70",
      purple: "text-purple-500/50",
    },
  };
  return (
    <div className={`h-36 md:h-56 lg:h-72 ${className && className}`}>
      <svg
        viewBox="0 0 200 200"
        className={cn(`h-full fill-current ${variants.color[color]}`, {
          "animate-blob-spin": !isReverse,
          "animate-blob-spin-reverse": isReverse,
        })}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52.3,-54.1C64.8,-39.7,70.1,-19.9,69.8,-0.3C69.6,19.3,63.8,38.7,51.2,52.1C38.7,65.5,19.3,73.1,0.1,73C-19.2,72.9,-38.3,65.2,-54.8,51.8C-71.2,38.3,-84.9,19.2,-86.1,-1.2C-87.3,-21.5,-75.9,-43,-59.5,-57.4C-43,-71.7,-21.5,-78.9,-0.8,-78C19.9,-77.2,39.7,-68.4,52.3,-54.1Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
};

export default Blob;
