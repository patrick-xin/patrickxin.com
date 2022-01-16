import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

import { useSortData } from "@common/hooks";
import { useDeletePost } from "@post/hooks";
import type { IPost } from "@post/types";

interface TableProps {
  posts: IPost[];
}

const Table = ({ posts }: TableProps) => {
  const tableHeadings = ["title", "views", "likes", "comments", "actions"];

  let normalizedPosts = [
    ...posts.map((post) => ({
      views: post.view_count,
      likes: post.like_count,
      comments: post.comments.length,
      title: post.slug,
    })),
  ];
  const { items, requestSort } = useSortData(normalizedPosts);

  return (
    <div className="flex flex-col min-h-screen max-w-5xl mx-auto">
      <div className="overflow-hidden sm:rounded-lg border-b border-gray-500">
        <table className="min-w-full divide-y divide-gray-500">
          <thead>
            <tr className="text-left">
              {tableHeadings.map((t) => (
                <TableHead key={t} title={t} onClick={requestSort} />
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500">
            {items.map((post) => (
              <TableRow key={post.title} post={post} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

const TableHead = ({ title, onClick }: { title: string; onClick }) => {
  return (
    <th
      scope="col"
      className="py-3 text-left text-base font-medium text-orange dark:text-mint uppercase tracking-wider"
    >
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
    </th>
  );
};

const TableRow = ({ post }: { post: any }) => {
  const { deletePost } = useDeletePost();
  return (
    <tr className="hover:bg-mint/20 dark:hover:bg-slate transition-colors ease-linear">
      <td className="py-4">
        <div className="flex items-center h-full w-full">
          <div className=" font-semibold text-lg">
            <Link href={`/admin/${post.title}`}>
              <a> {post.title}</a>
            </Link>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap ">
        <div>{post.views}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div>{post.likes}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>{post.comments}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => deletePost(post.title)}
          className="bg-red-700 text-snow text-sm rounded px-2 py-1 inline-flex justify-center w-20"
        >
          delete
        </button>
      </td>
    </tr>
  );
};
