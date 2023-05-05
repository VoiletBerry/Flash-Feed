import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import Login from "./components/Login";
import Body from "./components/Body";
import CardsContainer from "./components/CardsContainer";
import Feed from "./components/Feed";
import CardDetail from "./components/CardDetail";
import CreateCard from "./components/CreateCard";
import UserProfile from "./components/UserProfile";
import { UserContext } from "./Context/UserContext";
import { useEffect, useState } from "react";
import Search from "./components/Search";

const AppLaout = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo =
      localStorage.getItem("user") !== undefined
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
    if (!userInfo) navigate("/login");
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Body />,
            children: [
              {
                path: "/",
                element: <Feed />,
              },
              {
                path: "/feed",
                element: <CardsContainer />,
              },
              {
                path: "/category/:categoryId",
                element: <Feed />,
              },
              {
                path: "/card-detail/:cardId",
                element: <CardDetail />,
              },
              {
                path: "/create-card",
                element: <CreateCard />,
              },
              {
                path: "/search",
                element: <Search />,
              },
            ],
          },
          {
            path: "/user-profile/:userId",
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default AppLaout;
