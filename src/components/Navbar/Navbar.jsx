import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateListener, logoutUser } from "../../context/UsersApi";
import logo from "../../assets/litflicksLogo.png";

function Navbar() {
const [currentUser, setCurrentUser] = useState(null)

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
        </div>
      </div>
      <Outlet />
    </header>
  );
}

export default Navbar;
