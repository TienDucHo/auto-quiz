//#region imports
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//#endregion

//#region pages
import { quizLoader } from "./pages/Quiz/Loader";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Quiz/Summary";
//#endregion

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
    path: "/quiz/:quizId",
    element: <Summary />,
    loader: quizLoader,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
