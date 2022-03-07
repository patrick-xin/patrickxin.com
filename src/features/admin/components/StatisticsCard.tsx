type StatisticsCardProps = {
  icon: React.ReactElement
  title: string
  count: number | undefined
  description?: string
  iconBg: string
}
const StatisticsCard = ({
  icon,
  title,
  count,
  iconBg,
}: StatisticsCardProps) => {
  return (
    <div className="flex flex-col justify-around items-center py-6 bg-white/10 rounded-xl">
      <div className="flex gap-3 items-center">
        <div
          className={`rounded-2xl ${iconBg} h-10 w-10 text-white p-2 flex justify-center items-center`}
        >
          {icon}
        </div>
        <h3>{title}</h3>
      </div>

      <div className="font-heading text-4xl tracking-wider">
        {count ? count : 0}
      </div>
    </div>
  )
}

export default StatisticsCard
