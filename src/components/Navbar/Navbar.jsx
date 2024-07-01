import { Outlet, NavLink } from "react-router-dom";
import logo from "../../assets/litflicksLogo.png";

function Navbar() {
  // const navigate = useNavigate()
  return (
    <header className="bg-orange-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 bg-orange-50">
        <div className="flex h-16 items-center justify-between  bg-orange-50">
          <div className="md:flex md:items-center md:gap-12">
            <img src={logo} alt="Logo" className="h-12" />
          </div>

          <div>
            <nav>
              <ul className="flex items-center gap-6 text-sm">
                <div></div>
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
              </ul>
              <button className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-500 transition-colors ease-in-out">
                Log in
              </button>
            </nav>
          </div>
        </div>
      </div>
      <Outlet />
    </header>
  );
}

export default Navbar;
