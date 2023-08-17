import { useDocumentTitle } from '../hooks/useDocumentHandler'

const Dashboard = () => {
  useDocumentTitle('Dashboard')
  return <h1>Dashboard</h1>
}

export default Dashboard
