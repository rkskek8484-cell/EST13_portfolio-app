export default function Home({ data }) {
  return (
    <main>
      <h1>Portfolio</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
