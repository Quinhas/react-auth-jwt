import {
  Route, Routes
} from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";

export function CustomRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/entrar' element={<LoginPage />} />
      <Route path='/cadastrar' element={<RegisterPage />} />
    </Routes>
  )
}