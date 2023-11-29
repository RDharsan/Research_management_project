import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import { Spinner } from '../../components/loading/Loading';
import UploadFile from '../../components/upload-file/UploadFile';
import { uploadFile } from '../../utli/aws.util';
import {
	addSubmissionType,
	getSubmissionTypeById,
	updateSubmissionType
} from '../../utli/submission-type.util';

const EditSubmissionType = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [submissionType, setSubmissionType] = useState({
		name: '',
		description: '',
		types: '.doc,.pdf',
		submissionDate: ''
	});
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		name: '',
		description: '',
		types: '',
		submissionDate: ''
	});

	const onChange = (e) => {
		setSubmissionType({
			...submissionType,
			[e.target.name]: e.target.value
		});
		setErrors({ ...errors, [e.target.name]: '' });
	};
	const validate = () => {
		let isValid = true;
		if (submissionType.name === '') {
			setErrors({ ...errors, name: 'Name is required' });
			isValid = false;
		} else if (
			submissionType.description === '' ||
			submissionType.description.length < 50
		) {
			setErrors({
				...errors,
				description: 'Description is required, Atleast 50 characters'
			});
			isValid = false;
		} else if (submissionType.types === '') {
			setErrors({ ...errors, types: 'File Types field is required' });
			isValid = false;
		} else if (submissionType.submissionDate === '') {
			setErrors({
				...errors,
				submissionDate: 'Submission Date is required'
			});
			isValid = false;
		}
		return isValid;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (validate()) {
			const response = await updateSubmissionType({
				...submissionType
			});
			if (response.status) {
				toast.success('Submission Type updated successfully');
				setLoading(false);
				navigate('/view-submissions');
			} else {
				toast.error(response.message);
				setLoading(false);
			}
		}
		setLoading(false);
	};

	const loadSubmissionType = async () => {
		setLoading(true);
		const response = await getSubmissionTypeById(id);
		if (response.status) {
			setSubmissionType(response.submissionType);
		} else {
			toast.error(response.message);
			navigate('/view-submissions');
		}
		setLoading(false);
	};
	useEffect(() => {
		loadSubmissionType();
	}, []);
	return (
		<div className=''>
			<div className='row justify-content-center'>
				<div className='col-md-8 form-background'>
					<h1>Update Submission type</h1>
					<form onSubmit={onSubmit}>
						{Object.keys(submissionType).map((key, index) => {
							if (
								key !== 'markingScheme' &&
								key !== '_id' &&
								key !== '__v'
							) {
								return (
									<Input
										key={index}
										label={
											key === 'types'
												? 'File Types (Comma separated ex: .pdf,.docs)'
												: key
										}
										name={key}
										value={submissionType[key]}
										onChange={onChange}
										isError={!!errors[key]}
										errorMessage={errors[key]}
										type={`${
											key === 'submissionDate'
												? 'date'
												: 'text'
										}`}
									/>
								);
							}
						})}

						<div className='row justify-content-end mt-3'>
							<div className='col-md-6'>
								<button className='btn btn-primary w-100'>
									{loading ? <Spinner /> : 'Update'}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditSubmissionType;
