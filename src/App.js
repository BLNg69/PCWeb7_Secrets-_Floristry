import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import MyPageHome from "./views/MyPageHome";
import SignUpPage from "./views/SignUpPage";
import MyPageAdd from "./views/MyPageAdd";
import MyPageDetails from "./views/MyPageDetails";
import MyPageUpdate from "./views/MyPageUpdate";
import MyPageDelete from "./views/MyPageDelete";

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
        <Route path="/floristdelete/:id" element={<MyPageDelete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
