import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import { Spinner } from '../../components/loading/Loading';
import UploadFile from '../../components/upload-file/UploadFile';
import { uploadFile } from '../../utli/aws.util';
import { addSubmissionType } from '../../utli/submission-type.util';

const CreateSubmissionType = () => {
	const navigate = useNavigate();
	const [file, setFile] = useState({
		file: null,
		signedRequest: null,
		signedUrl: null
	});
	const [submissionType, setSubmissionType] = useState({
		name: '',
		description: '',
		types: '.doc,.pdf',
		submissionDate: '',
		markingScheme: ''
	});
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		name: '',
		description: '',
		types: '',
		submissionDate: '',
		markingScheme: ''
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
		} else if (
			file.file === null ||
			file.file === undefined ||
			file.signedRequest === null ||
			file.signedRequest === undefined
		) {
			setErrors({
				...errors,
				markingScheme: 'Marking scheme is required'
			});
			isValid = false;
		}
		return isValid;
	};

	const onFileSelect = (status, file, signedRequst, signedUrl) => {
		if (status) {
			setErrors({ ...errors, markingScheme: '' });
			setFile({
				file: file,
				signedRequest: signedRequst,
				signedUrl: signedUrl
			});
		}
	};

	const _uploadFile = async () => {
		setLoading(true);
		const response = await uploadFile(file.file, file.signedRequest);
		setLoading(false);
		if (response.status) {
			return true;
		}
		return false;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (validate()) {
			const status = await _uploadFile();
			if (!status) {
				toast.error('Error uploading file');
				setLoading(false);
				return;
			}
			const response = await addSubmissionType({
				...submissionType,
				markingScheme: file.signedUrl
			});
			if (response.status) {
				toast.success('Submission Type created successfully');
				setLoading(false);
				navigate('/view-submissions');
			} else {
				toast.error(response.message);
				setLoading(false);
			}
		}
		setLoading(false);
	};

	return (
		<div className=''>
			<div className='row justify-content-center'>
				<div className='col-md-8 form-background'>
					<h1>Create Submission type</h1>
					<form onSubmit={onSubmit}>
						{Object.keys(submissionType).map((key, index) => {
							if (key !== 'markingScheme') {
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
						<UploadFile
							acceptedTypes='.pdf'
							title='Marking Scheme'
							onFileSelect={onFileSelect}
						/>
						{errors.markingScheme && (
							<div className='alert alert-danger'>
								{errors.markingScheme}
							</div>
						)}
						<div className='row justify-content-end mt-3'>
							<div className='col-md-6'>
								<button className='btn btn-primary w-100'>
									{loading ? <Spinner /> : 'Create'}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateSubmissionType;
