//#region imports
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { quizLoader } from "./pages/Quiz/Loader";

//#endregion

//#region pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Quiz/Create";
//#endregion
import Summary from "./pages/Quiz/Summary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/quiz-create",
    element: <Create />,
  },
  
  {
    path: "/quiz/:quizId",
    element: <Summary />,
    loader: quizLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
