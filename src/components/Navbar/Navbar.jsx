import { Outlet, NavLink } from "react-router-dom";
import logo from "../../assets/litflicksLogo.png"

function Navbar() {
  return (
    <div>
      <nav className="sticky flex justify-between top-0 bg-slate-400">
        <img src={logo} alt="logo" className=" h-12 mr-4" />
        <ul className="flex-1 flex items-center justify-end">
          <li className="nav-items">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-items">
            <NavLink to="/adaptations">Adaptations</NavLink>
          </li>
          <li className="nav-items">
            <NavLink to="/adaptation">Adaptation</NavLink>
          </li>
          <li className="nav-items">
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
export default Navbar;
