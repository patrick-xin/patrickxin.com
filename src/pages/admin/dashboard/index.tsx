// import { ReactElement, useState } from "react";
// import { GetServerSideProps } from "next";
// import { useMutation, useQuery, useQueryClient } from "react-query";
// import cn from "classnames";

import { usePosts } from "@post/lib/query";
import { useDeleteUser, useGetUsers, useLogout } from "features/admin/hooks";
import AdminLayout from "features/admin/layout";
import { Fragment, ReactElement } from "react";
import { StatisticsCard, Table } from "@admin/components";
import { ChatIcon, EyeIcon, HeartIcon } from "@heroicons/react/solid";
// import prisma from "@common/lib/prisma";
// import { fetcher } from "@utils/fetcher";

// import { Table, Nofification } from "@features/admin/components";
// import AdminLayout from "@features/admin/layout";

// import type { Post, CommentNotification } from "@features/post/types";
// import {
//   ChatAltIcon,
//   EyeIcon,
//   HeartIcon,
//   UserGroupIcon,
// } from "@heroicons/react/solid";
// import StatisticsCard from "@features/admin/components/statistics-card";
// import OverallChart from "@features/admin/components/chart/overall-chart";
// import ListSelect from "@features/admin/components/chart/list-box";
// import { usePosts } from "@features/post/hooks";
// import { parseISO, format } from "date-fns";

// const DashboradPage = ({ blogs }: { blogs: Post[] }) => {
//   // const { likes } = usePostsLikes();
//   // console.log(likes);
//   const { data: allPosts } = usePosts();
//   const trans = () => {
//     const group: { [key: string]: string[] } = {};
//     allPosts?.comments.forEach(({ createdAt }) => {
//       const date = format(parseISO(createdAt), "MM/dd/yyyy");
//       group[date] = (group[date] || []).concat(date);
//     });
//     return Object.keys(group).map((date) => ({
//       [date]: group[date].length,
//     }));
//   };
//   console.log(allPosts?.comments.length);

//   console.log(trans());

//   const { data, isFetching: isGettingNotification } = useQuery<{
//     notifications: CommentNotification[];
//   }>(["blog", "notification"], () =>
//     fetcher<{ notifications: CommentNotification[] }>("/api/post/notifications")
//   );
//   const [show, setShow] = useState(false);
//   const queryClient = useQueryClient();

//   const { mutate: readOneMutate } = useMutation(
//     (notiId: String) => {
//       return fetch(`/api/posts/notifications/${notiId}`, {
//         method: "PATCH",
//       });
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["blog", "notification"]);
//       },
//     }
//   );

//   return (
//     <div>
//       <div className="mx-auto">
//         <Nofification notifications={data?.notifications} />

//         {/* <Table blogs={blogs} /> */}
//         <div className="grid grid-cols-4 h-48 gap-6">
//           <StatisticsCard
//             title="Total Views"
//             description="40%+ this week"
//             count={allPosts?.data.viewsCount}
//             icon={<EyeIcon />}
//             iconBg="bg-accent"
//           />
//           <StatisticsCard
//             title="Total Comments"
//             description="20%+ this week"
//             count={allPosts?.data.commentsCount}
//             icon={<ChatAltIcon />}
//             iconBg="bg-dark-accent"
//           />
//           <StatisticsCard
//             title="Total Likes"
//             description="40%+ this week"
//             count={allPosts?.data.likesCount}
//             icon={<HeartIcon />}
//             iconBg="bg-red-500"
//           />
//           <StatisticsCard
//             title="Subscribers"
//             description="1%+ this week"
//             count={23}
//             icon={<UserGroupIcon />}
//             iconBg="bg-purple-500"
//           />
//         </div>
//         <div className="w-full flex justify-end my-6">
//           <ListSelect />
//         </div>
//         <OverallChart />
//         <div>
//           {allPosts &&
//             allPosts.comments.map((comment) => <div>{comment.createdAt}</div>)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboradPage;

// DashboradPage.getLayout = function getLayout(page: ReactElement) {
//   return <AdminLayout>{page}</AdminLayout>;
// };

const DashboardPage = () => {
  const { data } = usePosts();

  return (
    <div>
      <div>
        <section className="grid grid-cols-3">
          <StatisticsCard
            count={data?.data.commentsCount}
            icon={<EyeIcon />}
            iconBg="bg-mint"
            title="Comments"
          />
          <StatisticsCard
            count={data?.data.likesCount}
            icon={<HeartIcon />}
            iconBg="bg-red-500"
            title="Likes"
          />
          <StatisticsCard
            count={data?.data.viewsCount}
            icon={<ChatIcon />}
            iconBg="bg-orange"
            title="Views"
          />
        </section>
      </div>
      <div className="mt-10">{data && <Table posts={data?.posts} />}</div>
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
