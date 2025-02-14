import EngagementMetrics from "@/components/EngagementMetrics"
import UserList from "@/components/UserList"

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Engagement Metrics</h2>
          <EngagementMetrics />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">User List</h2>
          <UserList />
        </div>
      </div>
    </div>
  )
}

