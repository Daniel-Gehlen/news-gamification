export default function RecentArticles() {
  const articles = [
    { id: 1, title: "Breaking News: Important Event", date: "2023-05-15" },
    { id: 2, title: "Tech Giant Announces New Product", date: "2023-05-14" },
    { id: 3, title: "Sports Team Wins Championship", date: "2023-05-13" },
  ]

  return (
    <ul className="bg-white rounded shadow divide-y">
      {articles.map((article) => (
        <li key={article.id} className="p-4">
          <h3 className="font-semibold">{article.title}</h3>
          <p className="text-sm text-gray-600">{article.date}</p>
        </li>
      ))}
    </ul>
  )
}

