import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SalonPage from './pages/SalonPage';
import CleaningPage from './pages/CleaningPage';
import ElectricianPage from './pages/ElectricianPage';
import PlumberPage from './pages/PlumberPage';
import CarWashPage from './pages/CarWashPage';
import SportsPage from './pages/SportsPage';
import EventsPage from './pages/EventsPage';
import UnifiedBookingPage from './pages/UnifiedBookingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/salon" element={<SalonPage />} />
            <Route path="/cleaning" element={<CleaningPage />} />
            <Route path="/electrician" element={<ElectricianPage />} />
            <Route path="/plumber" element={<PlumberPage />} />
            <Route path="/car-wash" element={<CarWashPage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/events" element={<EventsPage />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Authenticated Routes */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            {/* Admin Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute adminOnly={true}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Single Dynamic Booking Route */}
            <Route path="/:service/book" element={<UnifiedBookingPage />} />
        </Routes>
    );
};

export default AppRoutes;
