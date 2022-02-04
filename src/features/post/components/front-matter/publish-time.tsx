const PublishTime = ({
  publishedAt,
  className,
}: {
  publishedAt: string;
  className?: string;
}) => {
  return (
    <span
      className={className ? className : "tracking-normal text-xs lg:text-sm"}
    >
      {publishedAt}
    </span>
  );
};

export default PublishTime;
