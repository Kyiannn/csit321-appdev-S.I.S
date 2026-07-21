import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/public/login";
import RegisterPage from "./pages/public/register";
import { ProfilePage, EditProfilePage } from "./pages/private/profile";
import AuthLayout from "./layouts/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;