import { Header } from '../components'

const AdminLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="px-12 mx-auto max-w-7xl">{children}</div>
    </>
  )
}

export default AdminLayout
