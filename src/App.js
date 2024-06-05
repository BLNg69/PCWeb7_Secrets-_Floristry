import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import MyPageHome from "./views/MyPageHome";
import SignUpPage from "./views/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyPageHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
