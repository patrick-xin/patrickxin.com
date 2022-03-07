import Link from 'next/link'
import cn from 'classnames'

import { ArrowLeftIcon, ArrowRightIcon } from '@/common/components/icon'

type PostNavLinkProps = {
  slug: string
  title: string
  isRight: boolean
}

const NavLink = ({ slug, title, isRight }: PostNavLinkProps) => {
  return (
    <div
      className={cn(
        'p-2 md:p-4 group lg:h-20 rounded-lg flex items-center gap-2 justify-start',
        {
          'flex-row-reverse nav-link-shadow': isRight,
          'nav-link-shadow-reversed': !isRight,
        }
      )}
    >
      {isRight ? <ArrowRightIcon /> : <ArrowLeftIcon />}

      <Link href={`/posts/${slug}`}>
        <a
          className={cn(
            'text-sm lg:text-2xl group-hover:underline underline-offset-2 decoration-orange/50 dark:decoration-mint/50',
            {
              'text-gradient group-hover:text-gradient-reversed': !isRight,
              'text-gradient-reversed group-hover:text-gradient': isRight,
            }
          )}
        >
          {title}
        </a>
      </Link>
    </div>
  )
}

export default NavLink
