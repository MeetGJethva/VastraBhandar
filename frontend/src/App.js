import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./pages/Customer/Home";
import ProductPage from "./pages/Customer/Products";
import CustomeCloth from "./pages/Customer/CustomCloth";
import OrderManagementPage from "./pages/Customer/OrderManagementPage";
import CartManagementPage from "./pages/Customer/CartManagementPage";
import ManageProductsPage from "./pages/Designer/manage_products/ManageProductsPage";
import ProtectedRoute from "./context/ProtectedRoute";
import { DesigerCustomeCloth } from "./pages/Designer/DesignerCustomeCloth";
import AuthForm from "./auth/AuthForm";
import AboutUs from "./pages/Customer/About";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login"];
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Restrict /products to only customers */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["CUSTOMER", "guest"]}
              allowGuests={true}
            />
          }
        >
          <Route path="/products" element={<ProductPage />} />
        </Route>

        {/* Customer Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route path="/customize" element={<CustomeCloth />} />
          <Route path="/orders" element={<OrderManagementPage />} />
          <Route path="/cart" element={<CartManagementPage />} />
        </Route>

        {/* Designer Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["DESIGNER"]} />}>
          <Route path="/designerCustomize" element={<DesigerCustomeCloth />} />
          <Route path="/myProducts" element={<ManageProductsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
