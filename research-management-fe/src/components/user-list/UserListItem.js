import React from 'react';

const UserListItem = ({ user, badge }) => {
	return (
		<li className='list-group-item d-flex justify-content-between align-items-start bg-dark text-light'>
			<div className='ms-2 me-auto'>
				<div className='fw-bold'>{user.name}</div>
				{user.email}
			</div>
			{badge && (
				<span className='badge bg-secondary rounded-pill'>{badge}</span>
			)}
		</li>
	);
};

export default UserListItem;
