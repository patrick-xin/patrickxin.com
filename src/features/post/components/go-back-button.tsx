import Link from 'next/link'

import { ArrowLeftIcon } from '@heroicons/react/solid'

type GoBackButtonProps = {
  path: string
  title: string
}

const GoBackButton = ({ path, title }: GoBackButtonProps) => {
  return (
    <button
      type="button"
      className="group inline-flex z-100 gap-2 items-center mb-4"
    >
      <ArrowLeftIcon className="w-4 h-4 text-orange dark:text-mint md:w-6 md:h-6" />
      <Link href={`${path}`}>
        <a className="text-sm dark:text-gray-500 group-hover:underline decoration-orange dark:decoration-mint decoration-2 underline-offset-4 transition-all ease-linear md:text-base">
          {title}
        </a>
      </Link>
    </button>
  )
}

export default GoBackButton
