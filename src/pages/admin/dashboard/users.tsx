import SpinLoader from "@common/components/svg/spin-loader";
import { useDeleteUser, useGetUsers, useLogout } from "features/admin/hooks";
import AdminLayout from "features/admin/layout";
import { Fragment, ReactElement, useMemo, useState } from "react";

const DashboardUsers = () => {
  const { users, error } = useGetUsers();
  const [loading, setLoading] = useState(false);
  const { deleteUser, isDeleting } = useDeleteUser();
  const renderTableHead = useMemo(() => {
    return () => {
      return (
        <thead className="border-b border-gray-500">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-orange dark:text-mint px-6 py-4 text-left"
            >
              username
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-orange dark:text-mint px-6 py-4 text-left"
            >
              email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-orange dark:text-mint px-6 py-4 text-left"
            >
              comments
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-orange dark:text-mint px-6 py-4 text-left"
            >
              actions
            </th>
          </tr>
        </thead>
      );
    };
  }, []);
  return (
    <div className="dark:text-snow">
      <div className="flex flex-col max-w-4xl mx-auto">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                {renderTableHead()}
                <tbody>
                  {users &&
                    users
                      .filter((user) => user.role !== "ADMIN")
                      .map((user, index) => (
                        <Fragment key={`${user.id}-${index}`}>
                          <tr
                            className={`border-t border-gray-500 ${
                              user.role === "ADMIN"
                                ? "dark:text-mint"
                                : "dark:text-snow"
                            }`}
                          >
                            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                              {user.username}
                            </td>
                            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                              {user.email}
                            </td>
                            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                              {user._count.comment}
                            </td>
                            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                              <button
                                className="bg-red-700 rounded px-2 py-1 inline-flex justify-center w-16"
                                onClick={() => {
                                  deleteUser(user.id);
                                }}
                              >
                                {isDeleting ? <SpinLoader /> : "delete"}
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                              {user.comment.map((comment) => (
                                <div className="flex gap-4" key={comment.id}>
                                  <div>
                                    <span className="dark:text-orange">
                                      content:
                                    </span>
                                    <span>{comment.content}</span>
                                  </div>
                                  <div>
                                    <span className="dark:text-orange">
                                      post:
                                    </span>
                                    {comment.post.slug}
                                  </div>
                                </div>
                              ))}
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;

DashboardUsers.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
