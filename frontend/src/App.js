import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import { ThemeProvider } from "./Theme/ThemeProvider";
import Header from "./Components/Header/Header";
import HomePage from "./pages/Home";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
