import { Frontmatter } from '@/post/types'

type ReadingTimeProps = Pick<Frontmatter, 'readingTime'>

const ReadingTime = ({ readingTime }: ReadingTimeProps) => {
  return (
    <span className="text-xs tracking-normal lg:text-sm">
      {Math.ceil(readingTime.minutes)} minutes read
    </span>
  )
}

export default ReadingTime
