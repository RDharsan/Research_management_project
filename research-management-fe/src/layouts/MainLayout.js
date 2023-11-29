import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { AuthProvider } from '../store/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ ...props }) => {
	return (
		<AuthProvider>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={'dark'}
			/>
			<Navbar />
			<div className='container mt-2'>{props.children}</div>
		</AuthProvider>
	);
};

export default MainLayout;
