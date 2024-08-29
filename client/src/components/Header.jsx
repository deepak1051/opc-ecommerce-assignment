import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="bg-gray-900 flex justify-between px-8 p-4 text-white font-bold items-center">
      <h2 className="italic">
        <Link to="/">Products</Link>
      </h2>
    </div>
  );
}
