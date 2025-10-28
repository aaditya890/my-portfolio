import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
//     children: [
//      {
//       path:"/route",
//       element:</>
//      }
//      ],
  },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  )
}

export default App
