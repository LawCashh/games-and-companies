import About from "../../pages/About/index.jsx";
import Games from "../../pages/Games/index.jsx";
import Companies from "../../pages/Companies/index.jsx";

const routes = [
  {
    name: "Games",
    path: "/add-game",
    component: () => <Games />,
  },
  {
    name: "Companies",
    path: "/get-companies",
    component: () => <Companies />,
  },
];

export default routes;
