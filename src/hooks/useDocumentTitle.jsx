import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const routeTitles = {
  "/": "Login",
  "/login": "Login",
  "/signup": "Sign Up",
  "/cart": "Cart",
  "/chat": "Chat",
  "/family_tree": "Family Tree",
  "/foreroom": "Foreroom",
  "/ecommerce": "Shop",
  "/checkout": "Checkout",
};

export const DocumentTitle = () => {
  const location = useLocation();

  const getTitle = (pathname) => {
    const title = routeTitles[pathname];
    return title ? `Kintree | ${title}` : "Kintree";
  };

  return (
    <Helmet>
      <title>{getTitle(location.pathname)}</title>
    </Helmet>
  );
};
