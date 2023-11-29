import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateGroup from '../../components/create-group/CreateGroup';
import Loading from '../../components/loading/Loading';
import StudentGroupComponent from '../../components/student-group/StudentGroupComponent';
import { AuthContext } from '../../store/auth';
import { loadGroupForStudent } from '../../utli/student-group.util';

const StudentGroup = () => {
	const { getUserInfo } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [group, setGroup] = useState(null);

	const loadGroup = async (id) => {
		setLoading(true);
		const response = await loadGroupForStudent(id);
		if (response.status) {
			setGroup(response.group);
		}
		setLoading(false);
	};
	useEffect(() => {
		const userInfo = getUserInfo();
		if (userInfo) {
			loadGroup(userInfo._id);
		}
	}, []);
	return (
		<div className=''>
			<h1>Student Group</h1>
			{loading ? (
				<Loading />
			) : group ? (
				<div>
					<h2>You are already in a group</h2>

					{/* card view for group */}
					<div className='row'>
						<div className='col-md-12 '>
							<div className='card bg-dark text-light'>
								<div className='card-body'>
									<h5 className='card-title'>
										Group name: {group.name}
									</h5>
									<p className='card-text'>
										Students : {group.students.length}
									</p>
									<hr />
									{group.students.length < 4 && (
										<Link
											to={`/add-students-to-group/${group._id}/${group.name}`}>
											<button className='btn btn-primary'>
												Add Students to the Group
											</button>
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='row mt-3'>
						<div className='col-md-12'>
							<StudentGroupComponent id={group._id} />
						</div>
					</div>
				</div>
			) : (
				<CreateGroup onGroupCreated={setGroup} />
			)}
		</div>
	);
};

export default StudentGroup;
