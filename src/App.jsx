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
import Summary from "./pages/Quiz/Summary";
import QuizViewPage from "./pages/Quiz/QuizViewPage";
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
    path: "/quiz-view-page",
    element: <QuizViewPage />,

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
