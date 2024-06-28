import { Outlet, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li className="text-red-900">
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/adaptations">Adaptations</NavLink>
          </li>
          <li>
            <NavLink to="/adaptation">Adaptation</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
export default Navbar;
