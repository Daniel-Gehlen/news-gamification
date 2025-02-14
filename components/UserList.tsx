export default function UserList() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", streak: 7 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", streak: 3 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", streak: 5 },
  ]

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

