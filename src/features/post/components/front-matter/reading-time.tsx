import { Frontmatter } from "@post/types";

type ReadingTimeProps = Pick<Frontmatter, "readingTime">;

const ReadingTime = ({ readingTime }: ReadingTimeProps) => {
  return (
    <span className="tracking-normal text-sm">
      {Math.ceil(readingTime.minutes)} minutes read
    </span>
  );
};

export default ReadingTime;
