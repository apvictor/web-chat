import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Contacts } from './pages/Contacts'
import { Messages } from './pages/Messages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Contacts />,
  },
  {
    path: "/:contactId",
    element: <Messages />,
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}

