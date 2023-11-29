import React, { useContext, useEffect, useState } from 'react';
import { Link, Router } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../components/routing/AdminRoutes';
import { STAFF_ROUTES } from '../../components/routing/StaffRoutes';
import { STUDENT_ROUTES } from '../../components/routing/StudentRoutes';
import { AuthContext } from '../../store/auth';

const Home = () => {
	const { getRole } = useContext(AuthContext);
	const role = getRole();
	const [routes, setRoutes] = useState([]);

	const getRoutesForRole = () => {
		if (role) {
			if (role === 'admin') {
				return ADMIN_ROUTES;
			} else if (role === 'staff') {
				return STAFF_ROUTES;
			} else if (role === 'student') {
				return STUDENT_ROUTES;
			}
		}
		return [{ path: '/login' }, { path: '/register' }];
	};

	useEffect(() => {
		const routes = getRoutesForRole();
		setRoutes(routes);
	}, []);

	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>Home</h1>
			</div>
			<div className='d-flex flex-row justify-content-center flex-wrap'>
				{routes.map((route) => {
					if (!route.path.split('/')[2]) {
						return (
							<Link
								to={route.path}
								key={route}
								className='bg-dark text-light p-5 m-2 w-25 text-decoration-none'>
								{route.path
									.split('/')[1]
									.toUpperCase()
									.split('-')
									.join(' ')}
							</Link>
						);
					}
				})}
			</div>
		</div>
	);
};

export default Home;
