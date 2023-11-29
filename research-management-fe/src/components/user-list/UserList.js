import React from 'react';
import UserListItem from './UserListItem';

const UserList = ({ title = 'users', users, badge }) => {
	return (
		<div>
			{title}
			<ul className='list-group list-group-numbered bg-dark text-light border border-light'>
				{users.map((user) => (
					<UserListItem key={user._id} user={user} badge={badge} />
				))}
			</ul>
		</div>
	);
};

export default UserList;
