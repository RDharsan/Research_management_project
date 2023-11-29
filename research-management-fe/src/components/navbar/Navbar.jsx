import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../store/auth';

const Navbar = () => {
	const { isAuthenticated, logout, getRole, authState } =
		useContext(AuthContext);

	const [paths, setPaths] = useState(['/login', '/register']);
	const location = useLocation();
	const currunt_path = location.pathname;

	useEffect(() => {
		if (isAuthenticated()) {
			const role = getRole();
			const paths = [];
			if (role === 'admin') {
				paths.push('/users');
				paths.push('/create-submission');
				paths.push('/view-submissions');
				paths.push('/add-categories');
				paths.push('/create-panel');
				paths.push('/manage-panels');
				paths.push('/manage-student-groups');
				paths.push('/manage-templates');
			} else if (role === 'student') {
				paths.push('/student-group');
				paths.push('/add-research');
				paths.push('/research-topic');
				paths.push('/submissions');
				paths.push('/templates');
				paths.push('/evaluated');
			} else if (role === 'staff') {
				paths.push('/approve-topics');
				paths.push('/add-field');
				paths.push('/evaluate-submissions');
				paths.push('/evaluated-submissions');
				paths.push('/view-templates');
			}
			setPaths(paths);
		} else {
			setPaths(['/login', '/register']);
		}
	}, [isAuthenticated, authState]);
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					Research Management
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						{paths.map((path) => {
							return (
								<li className='nav-item' key={path}>
									<Link
										className={`nav-link ${
											path === currunt_path
												? 'active'
												: ''
										}`}
										to={path}>
										{path
											.split('/')[1]
											.toUpperCase()
											.split('-')
											.join(' ')}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				{isAuthenticated() && (
					<button
						className='btn btn-danger float-end'
						onClick={logout}>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
