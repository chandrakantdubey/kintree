import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { DocumentTitle } from "../../hooks/useDocumentTitle";

function Layout() {
  return (
    <div className="min-h-screen bg-brand font-barlow">
      <DocumentTitle />
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
