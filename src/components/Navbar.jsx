import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#14181c] text-white py-4 shadow-md fixed top-0 left-0 z-10">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">🎬 Movie Night</h1>
          <span className="text-xs opacity-75 block">
            Powered by Letterboxd + TMDB
          </span>
        </div>

        <div className="flex items-center gap-6 font-semibold uppercase">
          <Link
            to="/"
            className="text-sm px-4 py-2 rounded-md bg-[#ff8000] hover:bg-orange-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/watchlist"
            className="text-sm px-4 py-2 rounded-md bg-[#00e054] hover:bg-green-600 transition-colors duration-200"
          >
            Watchlist
          </Link>
          <Link
            to="/logs"
            className="text-sm px-4 py-2 rounded-md bg-[#40bcf4] hover:bg-blue-600 transition-colors duration-200"
          >
            Logs
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
