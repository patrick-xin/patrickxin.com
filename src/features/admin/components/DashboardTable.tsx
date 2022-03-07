import Link from 'next/link'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'

import ReplyModal from './ReplyModal'

import { useToggle } from '@/common/hooks'

import type { IUser, NormalizedPost } from '../types'

type DashboardTableProps = {
  headings: string[]
  onTHeadClick?: (key: string) => void
  rowItems: NormalizedPost[] | IUser[]
  openModal: (key: string) => void
  type: 'users' | 'posts'
}

const DashboardTable = ({
  headings,
  onTHeadClick,
  rowItems,
  openModal,
  type,
}: DashboardTableProps) => {
  return (
    <table className="min-w-full border border-gray-300 dark:border-gray-600 divide-y divide-gray-300 dark:divide-gray-600">
      <thead>
        <tr className="text-left">
          {headings.map((heading) => (
            <TableHead key={heading} title={heading} onClick={onTHeadClick} />
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
        {rowItems.map((item, index) => (
          <TableRow
            type={type}
            key={index}
            item={item}
            setOpenModal={() =>
              openModal(type === 'posts' ? item.title : item.id)
            }
          />
        ))}
      </tbody>
    </table>
  )
}

export default DashboardTable

const TableHead = ({
  title,
  onClick,
}: {
  title: string
  onClick: (key: string) => void
}) => {
  return (
    <th
      scope="col"
      className="py-3 text-base font-medium tracking-wider text-left text-orange dark:text-mint"
    >
      {title === 'actions' ? (
        <span className="ml-6">{title}</span>
      ) : (
        <button
          className="flex gap-2 items-center p-2 rounded"
          onClick={() => onClick(title)}
        >
          <span>{title}</span>
          <span className="inline-flex flex-col">
            <ChevronUpIcon className="w-3 h-3 text-mint dark:text-orange" />
            <ChevronDownIcon className="w-3 h-3 text-mint dark:text-orange" />
          </span>
        </button>
      )}
    </th>
  )
}

const TableRow = ({
  item,
  setOpenModal,
  type,
}: {
  item
  setOpenModal: () => void
  type: 'users' | 'posts'
}) => {
  const [open, setOpen] = useToggle()

  return (
    <>
      <ReplyModal
        isOpen={open}
        onClose={setOpen}
        user={{ username: item.username, comment: item.comment }}
      />
      <tr className="hover:bg-black/5 dark:hover:bg-white/10 transition-colors ease-linear">
        {type === 'posts' && (
          <>
            <td className="py-4 px-2">
              <div className="flex items-center w-full h-full">
                <div className="text-lg font-semibold">
                  <Link href={`/admin/${item.title}`}>
                    <a> {item.title}</a>
                  </Link>
                </div>
              </div>
            </td>
            <td className="py-4 px-6 whitespace-nowrap ">{item.views}</td>

            <td className="py-4 px-6 whitespace-nowrap">
              <div>{item.likes}</div>
            </td>
            <td className="py-4 px-6 whitespace-nowrap">
              <div>{item.comments}</div>
            </td>
          </>
        )}
        {type === 'users' && (
          <>
            <td className="py-4 px-6 whitespace-nowrap">
              <div>{item.username}</div>
            </td>
            <td className="py-4 px-6 whitespace-nowrap ">{item.email}</td>
            <td className="py-4 px-6 whitespace-nowrap">
              <div>{item.comment[0].content}</div>
              <button
                onClick={setOpen}
                className="inline-flex justify-center py-1 px-2 w-20 text-sm text-snow bg-orange rounded"
              >
                reply
              </button>
            </td>
          </>
        )}

        <td className="py-4 px-6 whitespace-nowrap">
          <button
            onClick={() => setOpenModal()}
            className="inline-flex justify-center py-1 px-2 w-20 text-sm text-snow bg-red-700 rounded"
          >
            delete
          </button>
        </td>
      </tr>
    </>
  )
}
