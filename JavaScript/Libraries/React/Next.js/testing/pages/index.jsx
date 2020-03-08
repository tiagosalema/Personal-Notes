import Link from 'next/link';

const App = () => {
  return (
    <div>
      <p>Home!</p>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
    </div>
  );
}

export default App;