import { usePosts } from "@post/hooks";

import AdminLayout from "features/admin/layout";
import { ReactElement } from "react";
import { StatisticsCard, Table } from "@admin/components";
import { ChatIcon, EyeIcon, HeartIcon } from "@heroicons/react/solid";

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
