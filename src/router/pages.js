// import Layout from "@/views/layout";
import Home from "@/views/Home";
import Error404 from "@/views/error/404";
import navPages from "./navPage";

const pages = [];
 filterNavPages(navPages);

function filterNavPages(data) {
  data.forEach((item, index) => {
    if (item.path) {
      pages.push(item);
    }
    item.children && item.children.length && filterNavPages(item.children);
  });
}

export const routes = [
  // {
  //   path: "/",
  //   name: "layout",
  //   redirect: "/login",
  //   children: [
  //   ]
  // },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/404",
    name: "404",
    component: Error404
  },
  ...pages
].concat( {
  path: "/*",
  name: "page404",
  component: Error404
});
