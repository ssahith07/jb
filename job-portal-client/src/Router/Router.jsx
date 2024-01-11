import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Shome from '../Pages/Shome'
import PostJob from "../Pages/PostJob";
import Signup from "../components/Signup";
import Login from "../components/Login";
import MyJobs from "../Pages/MyJobs";
// import Passage from "../components/Passage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "/", element: <Passage /> },
      { path: "/", element: <Home/> },
      { path: "/S-home", element: <Shome/> },
      { path: "/sign-up", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/post-job", element: <PostJob /> },
      { path: "/my-job", element: <MyJobs /> },
    ],
  },
]);

// const router = createRoute(routes);

export default routes;
