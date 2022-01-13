type StatisticsCardProps = {
  icon: React.ReactElement;
  title: string;
  count: number | undefined;
  description?: string;
  iconBg: string;
};
const StatisticsCard = ({
  icon,
  title,
  count,
  description,
  iconBg,
}: StatisticsCardProps) => {
  return (
    <div className="bg-dark-code-background rounded-xl flex flex-col items-center justify-around">
      <div className="flex gap-3 items-center">
        <div
          className={`rounded-2xl ${iconBg} h-10 w-10 text-white p-2 flex justify-center items-center`}
        >
          {icon}
        </div>
        <h3>{title}</h3>
      </div>
      {count && (
        <div className="text-4xl font-heading tracking-wider">{count}</div>
      )}
    </div>
  );
};

export default StatisticsCard;
