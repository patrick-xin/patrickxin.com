import { ReactElement, useState } from 'react'

import { ConfirmModal, DashboardTable, AdminLayout } from '@/admin/components'

import { deleteUser, useGetUsers } from '@/admin/hooks'
import { useMutation, useQueryClient } from 'react-query'

import { USER_TABLE_HEADINGS } from '@/common/constants'
import { useToastStore, useToggle } from '@/common/hooks'

const DashboardUsers = () => {
  const { users, error } = useGetUsers()

  const [isOpen, setOpen] = useToggle()
  const [userId, setUserId] = useState(null)
  const { toast } = useToastStore()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      toast.success('User deleted', {
        position: 'topRight',
        direction: 'fadeLeft',
      })
      setOpen()
    },
  })
  function openModal(id: string) {
    setOpen()
    setUserId(id)
  }

  if (error) return <div>Erroe fetching users..</div>
  if (!users || (users && users.length === 0)) return <div>No users</div>
  return (
    <div className="max-w-6xl dark:text-snow">
      <ConfirmModal
        title={`Are you sure to delete ${userId}?`}
        isOpen={isOpen}
        onClose={setOpen}
        isLoading={isLoading}
        onConfirm={() => mutate({ id: userId })}
      />
      <DashboardTable
        type="users"
        headings={USER_TABLE_HEADINGS}
        openModal={openModal}
        rowItems={users}
      />
    </div>
  )
}

export default DashboardUsers

DashboardUsers.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
