import type { RouteObject } from "react-router";
import { CVViewer } from "./features/cv/CVViewer";
import { defaultCVData } from "./data/default-cv";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <CVViewer data={defaultCVData} />,
  },
];
