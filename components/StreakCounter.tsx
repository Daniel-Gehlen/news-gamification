interface StreakCounterProps {
  streak: number
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-4xl font-bold text-center">{streak}</p>
      <p className="text-center text-gray-600">Days in a row</p>
    </div>
  )
}

