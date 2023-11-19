//#region imports
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//#endregion

//#region pages
import { attemptLoader, quizLoader } from "./pages/Quiz/Loader";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Quiz/Summary";
import NewAttempt from "./pages/NewAttempt";
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
  {
    path: "/quiz/:quizId/:attemptId",
    element: <NewAttempt />,
    loader: attemptLoader
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
