import DashboardTable from "./table-component";

import { useSortData } from "@/common/hooks";
import { POST_TABLE_HEADINGS } from "@/common/constants";

import type { NormalizedPost } from "../types";
import type { IPost } from "@/post/types";

interface TableProps {
  posts: IPost[];
  openModal: (slug: string) => void;
}

const PostTable = ({ posts, openModal }: TableProps) => {
  let normalizedPosts = [
    ...posts.map((post) => ({
      views: post.view_count,
      likes: post.like_count,
      comments: post.comments.length,
      title: post.slug,
      id: post.slug,
    })),
  ];
  const { items, requestSort } = useSortData<NormalizedPost>(normalizedPosts);

  return (
    <div className="flex flex-col min-h-screen max-w-full mx-auto">
      <DashboardTable
        rowItems={items}
        type="posts"
        onTHeadClick={requestSort}
        headings={POST_TABLE_HEADINGS}
        openModal={openModal}
      />
    </div>
  );
};

export default PostTable;
