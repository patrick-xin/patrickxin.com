import React from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

import { IUser, NormalizedPost } from "../types";

type DashboardTableProps = {
  headings: string[];
  onTHeadClick?: (key: string) => void;
  rowItems: NormalizedPost[] | IUser[];
  openModal: (key: string) => void;
  type: "users" | "posts";
};

const DashboardTable = ({
  headings,
  onTHeadClick,
  rowItems,
  openModal,
  type,
}: DashboardTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600 border border-gray-300 dark:border-gray-600">
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
              openModal(type === "posts" ? item.title : item.id)
            }
          />
        ))}
      </tbody>
    </table>
  );
};

export default DashboardTable;

const TableHead = ({
  title,
  onClick,
}: {
  title: string;
  onClick: (key: string) => void;
}) => {
  return (
    <th
      scope="col"
      className="py-3 text-left text-base font-medium text-orange dark:text-mint tracking-wider"
    >
      {title === "actions" ? (
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
  );
};

const TableRow = ({
  item,
  setOpenModal,
  type,
}: {
  item;
  setOpenModal: () => void;
  type: "users" | "posts";
}) => {
  console.log(item);

  return (
    <tr className="hover:bg-black/5 dark:hover:bg-white/10 transition-colors ease-linear">
      {type === "posts" && (
        <>
          <td className="py-4 px-2">
            <div className="flex items-center h-full w-full">
              <div className="font-semibold text-lg">
                <Link href={`/admin/${item.title}`}>
                  <a> {item.title}</a>
                </Link>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap ">{item.views}</td>

          <td className="px-6 py-4 whitespace-nowrap">
            <div>{item.likes}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div>{item.comments}</div>
          </td>
        </>
      )}
      {type === "users" && (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div>{item.username}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap ">{item.email}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div>{item.comment[0].content}</div>
          </td>
        </>
      )}

      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => setOpenModal()}
          className="bg-red-700 text-snow text-sm rounded px-2 py-1 inline-flex justify-center w-20"
        >
          delete
        </button>
      </td>
    </tr>
  );
};
