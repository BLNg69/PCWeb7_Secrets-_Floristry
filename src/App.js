import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import MyPageHome from "./views/MyPageHome";
import SignUpPage from "./views/SignUpPage";
import MyPageAdd from "./views/MyPageAdd";
import MyPageDetails from "./views/MyPageDetails";
import MyPageUpdate from "./views/MyPageUpdate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyPageHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/add" element={<MyPageAdd />} />
        <Route path="/florist/:id" element={<MyPageDetails />} />
        <Route path="/update/:id" element={<MyPageUpdate />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
