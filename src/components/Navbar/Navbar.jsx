import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateListener, logoutUser } from "../../context/UsersApi";
import { getAdaptations } from "../../services/adaptationsApi";
import logo from "../../assets/logo.png";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [adaptations, setAdaptations] = useState([]);
  const [filteredAdaptations, setFilteredAdaptations] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAdaptations = async () => {
      try {
        const adaptationsData = await getAdaptations();
        setAdaptations(adaptationsData);
      } catch (error) {
        console.error("Error fetching adaptations:", error);
      }
    };

    fetchAdaptations();
  }, []);

  useEffect(() => {
    const filtered = adaptations.filter((adaptation) =>
      adaptation.bookTitle.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setFilteredAdaptations(filtered);
  }, [searchQuery, adaptations]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateListener(setCurrentUser);
    return () => unsubscribe;
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  const handleSearchResultClicked = (adaptation) => {
       navigate(`/adaptation/${adaptation.id}`);
       setSearchQuery("");
     };

   

  return (
    <header className="bg-[#153448] shadow-xl sticky top-0 z-50  ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-12 sm:w-[30%]">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-16 w-[11rem] " />
            </Link>
          </div>
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
            <input
              type="text"
              placeholder="Search For Adaptation"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="block w-full px-4 py-2  border border-gray-500 rounded-md shadow-xl focus:outline-none focus:ring-2 focus:ring-red-600 "
            />
            {searchQuery && filteredAdaptations.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-600 z-50">
                <ul className="py-1">
                  {filteredAdaptations.map((adaptation) => (
                    <li
                      key={adaptation.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSearchResultClicked(adaptation)}
                    >
                      {adaptation.bookTitle}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <nav>
              <ul className="flex items-center gap-4 sm:gap-3 sm:text-sm text-sm">
                <li>
                  <NavLink className="nav-items" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-items" to="/adaptations">
                    Adaptations
                  </NavLink>
                </li>
                {currentUser ? (
                  <li>
                    <button
                      className="rounded-md bg-red-600 px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-white shadow hover:bg-red-500 transition-colors ease-in-out"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink className="nav-items" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-items" to="/register">
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Outlet />
    </header>
  );
}

export default Navbar;
