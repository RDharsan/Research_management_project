import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/routing/RequireAuth';
import MainLayout from './layouts/MainLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import axios from 'axios';
import './app.css';
import { getAdminRoutes } from './components/routing/AdminRoutes';
import { getStudentRoutes } from './components/routing/StudentRoutes';
import { getStaffRoutes } from './components/routing/StaffRoutes';
import Home from './pages/shared/Home';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
	return (
		<BrowserRouter>
			<MainLayout>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					{getStaffRoutes()}
					{getAdminRoutes()}
					{getStudentRoutes()}
				</Routes>
			</MainLayout>
		</BrowserRouter>
	);
};

export default App;
