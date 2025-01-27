import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import { ThemeProvider } from "./Theme/ThemeProvider";
import Header from "./Components/Header/Header";
import HomePage from "./pages/Customer/Home";
import ProductPage from "./pages/Customer/Products";
import CustomeCloth from "./pages/Customer/CustomCloth";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductPage/>}/>
          <Route path="/customize" element={<CustomeCloth/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
