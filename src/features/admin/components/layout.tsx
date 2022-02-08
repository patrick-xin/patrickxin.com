import { Header } from "../components";

const AdminLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="px-12 max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
