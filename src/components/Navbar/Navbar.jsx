import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateListener, logoutUser } from "../../context/UsersApi";
import { getAdaptations } from "../../services/adaptationsApi";
import logo from "../../assets/litflicksLogo.png";

function Navbar() {
const [currentUser, setCurrentUser] = useState(null)
 const [searchQuery, setSearchQuery] = useState("");
 const [adaptations, setAdaptations] = useState([]);
 const [filteredAdaptations, setFilteredAdaptations] = useState([]);

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
   // Filter adaptations based on searchQuery
   const filtered = adaptations.filter((adaptation) =>
     adaptation.bookTitle.toLowerCase().startsWith(searchQuery.toLowerCase())
   );
   setFilteredAdaptations(filtered);
 }, [searchQuery, adaptations]);

 const handleSearchInputChange = (e) => {
   setSearchQuery(e.target.value);
 };

useEffect (() => {
  const unsubscribe = onAuthStateListener(setCurrentUser)
  return () => unsubscribe
}, [])

const handleLogout = () => {
  logoutUser()
}

  return (
    <header className="bg-orange-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 bg-orange-50">
        <div className="flex h-16 items-center justify-between bg-orange-50">
          <div className="md:flex md:items-center md:gap-12">
            <img src={logo} alt="Logo" className="h-12" />
          </div>

          <div>
            <nav>
              <ul className="flex items-center gap-6 text-sm">
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
                      className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-red-500 transition-colors ease-in-out"
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
          <div className="relative">
            <input
              type="text"
              placeholder="Search For Adaptation"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="block w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {searchQuery && filteredAdaptations.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <ul className="py-1">
                  {filteredAdaptations.map((adaptation) => (
                    <li
                      key={adaptation.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {adaptation.bookTitle}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </header>
  );
}

export default Navbar;
