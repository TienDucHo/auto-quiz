//#region imports
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//#endregion

//#region pages
import { quizLoader, attemptLoader } from "./pages/Quiz/Loader";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Quiz/Create";
import Summary from "./pages/Quiz/Summary";
import NewAttempt from "./pages/NewAttempt";
import QuizViewPage from "./pages/QuizViewPage";
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
    path: "/quiz-create",
    element: <Create />,
  },

  {
    path: "/quiz/:quizId",
    element: <Summary />,
    loader: quizLoader,
  },
  {
    path: "/quiz/:quizId/:attemptId",
    element: <NewAttempt />,
    loader: attemptLoader,
  },
  {
    path: "/quiz/:quizId/attempt/:attemptId",
    element: <QuizViewPage />,
    loader: attemptLoader,
  },
  {
    path: "/quiz/:quizId/attempt-create",
    element: <NewAttempt />,
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
