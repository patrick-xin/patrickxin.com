import cn from 'classnames'

type PostTitleProps = {
  title: string
  isGradient?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const PostTitle = ({
  title,
  isGradient = true,
  size = 'lg',
  className,
}: PostTitleProps) => {
  return (
    <h1
      className={cn(
        `capitalize text-gradient font-heading ${className ? className : ''}`,
        {
          'text-3xl py-4 font-black md:text-5xl xl:leading-14 lg:text-6xl':
            size === 'lg',
          'text-2xl font-medium xl:text-3xl': size === 'md',
          'text-xl font-medium xl:text-2xl': size === 'sm',
          'text-gradient': isGradient,
        }
      )}
    >
      {title}
    </h1>
  )
}

export default PostTitle
