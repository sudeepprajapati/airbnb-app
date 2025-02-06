import './App.css'
import { Routes, Route } from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext';
import ProfilePage from './pages/ProfilePage';
import AuthMiddleware from './middleware';
import PlacesPage from './pages/PlacesPage';
import PlacesForm from './Components/PlacesForm';

axios.defaults.baseURL = 'http://localhost:3000/api/v1/users/';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/test" element={<h2>test</h2>} /> */}
          <Route path="/account/" element={
            <AuthMiddleware>
              <ProfilePage />
            </AuthMiddleware>
          } />
          <Route path="/account/places" element={
            <AuthMiddleware>
              <PlacesPage />
            </AuthMiddleware>
          } />
          <Route path="/account/places/new" element={
            <AuthMiddleware>
              <PlacesForm />
            </AuthMiddleware>
          } />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
