export default function EngagementMetrics() {
  const metrics = [
    { label: "Total Users", value: 1000 },
    { label: "Active Users", value: 750 },
    { label: "Average Streak", value: 3.5 },
  ]

  return (
    <div className="bg-white rounded shadow p-4">
      {metrics.map((metric, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <p className="text-sm text-gray-600">{metric.label}</p>
          <p className="text-2xl font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  )
}

