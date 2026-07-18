import { BrowserRouter, Route, Routes } from "react-router"
import LoginPage from "./pages/public/login"
import RegisterPage from "./pages/public/register"
import DashboardPage from "./pages/private/dashboard"
import LandingLayout from "./layouts/landing"
import AuthLayout from "./layouts/auth"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>}/>
        </Route>

        <Route element={<LandingLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
