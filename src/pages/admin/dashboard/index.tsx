import { useDeletePost, usePosts } from '@/post/hooks'

import { ReactElement, useState } from 'react'
import { StatisticsCard, PostTable, AdminLayout } from '@/admin/components'
import { ChatIcon, EyeIcon, HeartIcon } from '@heroicons/react/solid'
import { useToggle } from '@/common/hooks'
import ConfirmModal from '@/admin/components/confirm-modal'
import { SpinLoader } from '@/common/components/icon'

const DashboardPage = () => {
  const { data } = usePosts()
  const [isOpen, setOpen] = useToggle()
  const [postSlug, setPostSlug] = useState(null)
  const { deletePost, isDeleting } = useDeletePost(setOpen)
  function openModal(slug: string) {
    setOpen()
    setPostSlug(slug)
  }
  if (!data)
    return (
      <div className="flex overflow-hidden absolute inset-0 justify-center items-center w-screen h-screen">
        <div className="flex gap-4 items-center text-center">
          <SpinLoader />
          <span className="text-orange dark:text-mint">loading...</span>
        </div>
      </div>
    )
  return (
    <div>
      <ConfirmModal
        title={`Are you sure to delete ${postSlug}?`}
        isOpen={isOpen}
        onClose={setOpen}
        isLoading={isDeleting}
        onConfirm={() => deletePost(postSlug)}
      />
      <section className="grid grid-cols-3 gap-6">
        <StatisticsCard
          count={data.data.commentsCount}
          icon={<EyeIcon />}
          iconBg="bg-mint"
          title="Comments"
        />
        <StatisticsCard
          count={data.data.likesCount}
          icon={<HeartIcon />}
          iconBg="bg-red-500"
          title="Likes"
        />
        <StatisticsCard
          count={data.data.viewsCount}
          icon={<ChatIcon />}
          iconBg="bg-orange"
          title="Views"
        />
      </section>

      <section className="mt-10">
        <PostTable posts={data.posts} openModal={openModal} />
      </section>
    </div>
  )
}

export default DashboardPage

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
