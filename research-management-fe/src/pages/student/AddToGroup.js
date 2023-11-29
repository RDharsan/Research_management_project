import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import Table from '../../components/table/Table';
import {
	addStudentToGroup,
	getGroupById,
	getStudentsWithoutAGroup
} from '../../utli/student-group.util';

const AddToGroup = () => {
	const { id, name } = useParams();
	const [allStudents, setAllStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [group, setGroup] = useState(null);

	const loadGroup = async (id) => {
		setLoading(true);
		const response = await getGroupById(id);
		if (response.status) {
			setGroup(response.group);
		}
		setLoading(false);
	};

	const loadStudents = async () => {
		setLoading(true);
		const response = await getStudentsWithoutAGroup();
		if (response.status) {
			setAllStudents(response.students);
			setFilteredStudents(response.students);
		} else {
			toast.error('Error loading students');
		}
		setLoading(false);
	};

	const loadInitialData = async () => {
		await loadStudents();
		await loadGroup(id);
	};

	useEffect(() => {
		loadInitialData();
	}, []);

	const onAddStudentToGroupClick = async (student) => {
		setLoading(true);
		const response = await addStudentToGroup(student, id);
		if (response.status) {
			toast.success('Student added to group');
			//remove student from list
			const newStudents = allStudents.filter((s) => s._id !== student);
			setAllStudents(newStudents);
			setFilteredStudents(newStudents);
			setGroup({ ...group, students: [...group.students, student] });
		} else {
			toast.error('Error adding student to group');
		}
		setLoading(false);
	};
	return (
		<div className='row justify-content-center'>
			<h1 className='text-center'>
				Add students to group - {name.toUpperCase()}
			</h1>
			{!loading ? (
				filteredStudents.length > 0 ? (
					group.students.length >= 4 ? (
						<div className='col-12  group-full mt-2'>
							<h2 className='text-center'>
								Group is full. You can not add more students to
								this group.
							</h2>
						</div>
					) : (
						<Table
							headers={['id', 'Name', 'Email', 'Add to group']}
							data={filteredStudents}
							keys={['_id', 'name', 'email']}
							extraBtn={true}
							extraBtnTitle='Add'
							id={'_id'}
							onExtraButtonClick={onAddStudentToGroupClick}
						/>
					)
				) : (
					<div className='col-md-12 group-full mt-2'>
						<h1 className='text-center'>No students found</h1>
					</div>
				)
			) : (
				<Loading />
			)}
		</div>
	);
};

export default AddToGroup;
