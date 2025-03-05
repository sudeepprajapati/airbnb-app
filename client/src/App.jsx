import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext';
import PlacesForm from './Components/PlacesForm';
import ProfilePage from './pages/ProfilePage';
import AuthMiddleware from './middleware';
import PlacesPage from './pages/PlacesPage';
import HeroPage from './pages/HeroPage';
import PlacePage from './pages/PlacePage';
import { BookingConfirmation } from './pages/BookingConfirmation';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import SearchResults from './Components/SearchResults';
import Hosting from './pages/Hosting';

axios.defaults.baseURL = 'http://localhost:3000/api/v1/users/';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/places/:id" element={<PlacePage />} />
          <Route path="/places/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/hosting" element={<Hosting />} />
          <Route path="/search" element={<SearchResults />} />
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
          <Route path="/account/places/:id" element={
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
