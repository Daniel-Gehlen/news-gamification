import StreakCounter from "@/components/StreakCounter"
import RecentArticles from "@/components/RecentArticles"

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Streak</h2>
          <StreakCounter streak={5} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Recent Articles</h2>
          <RecentArticles />
        </div>
      </div>
    </div>
  )
}

