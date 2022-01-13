import { Header } from "../components";
import SidebarNav from "../components/sidebar";

const AdminLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-12 mx-6 gap-6">
        <SidebarNav />
        <div className="col-span-10 px-12">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
