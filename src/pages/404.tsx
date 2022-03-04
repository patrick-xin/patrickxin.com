import { Planet } from '@/common/components'
import { GoBackButton } from '@/post/components'

const NotFoundPage = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center px-6 h-screen">
      <div className="mt-32 space-y-10 lg:space-y-16">
        <div className="text-8xl font-bold text-orange dark:text-mint">404</div>
        <h1 className="text-3xl md:text-4xl lg:text-6xl">
          Opps, you&apos;re lost in space.
        </h1>
        <p>This page could not be found...</p>{' '}
        <GoBackButton path="/" title="Take me back to home" />
      </div>
      <Planet />
    </div>
  )
}

export default NotFoundPage
