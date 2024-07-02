import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Adaptations from "./pages/Adaptations/Adaptations";
import Adaptation from "./pages/Adaptation/Adaptation";
import Login from "./pages/Login/Login2";
import Register from "./pages/Login/Register";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";

const routes = [
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "adaptations",
        element: <Adaptations />,
      },
      {
        path: "adaptation/:adaptationId",
        element: <Adaptation />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
