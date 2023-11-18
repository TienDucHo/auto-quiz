import "./App.css";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Summary from "./pages/Quiz/Summary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz/:quizId",
    element: <Summary />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
