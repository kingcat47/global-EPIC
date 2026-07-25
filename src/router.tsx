import { createBrowserRouter } from "react-router-dom";

import { Home, Events, EventDetail, EarthGallery } from "@/pages";
import { RootLayout } from "@/components/layout";

const Router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/events",
        element: <Events />,
        children: [
          { path: ":id", element: <EventDetail /> },
        ],
      },
      { path: "/earth", element: <EarthGallery /> },
    ],
  },
]);

export default Router;
