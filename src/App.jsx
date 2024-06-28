import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Adaptations from "./pages/Adaptations/Adaptations";
import Adaptation from "./pages/Adaptation/Adaptation";
import Login from "./pages/Login/Login";

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
      }
    ],
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
