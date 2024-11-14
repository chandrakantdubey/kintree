import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import { store } from "./store/store";
import Layout from "./components/layout/layout";
import ProtectedRoute from "./components/protectedRoute";
import Cart from "./pages/Cart";
import Chat from "./pages/Chat";
import Foreroom from "./pages/Foreroom";
import Ecommerce from "./pages/Ecommerce";
import { LoginFlow, SignupFlow } from "./pages/Auth";
import FamilyTree from "./pages/FamilyTree";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginFlow />} />
              <Route path="/signup" element={<SignupFlow />} />
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/family_tree" element={<FamilyTree />} />
                <Route path="/foreroom" element={<Foreroom />} />
                <Route path="/ecommerce" element={<Ecommerce />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          </Routes>
        </Router>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
