import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFile } from '../../utli/aws.util';
import { createTemplate } from '../../utli/template.util';
import Input from '../input/Input';
import { Spinner } from '../loading/Loading';
import UploadFile from '../upload-file/UploadFile';

const CreateTemplate = ({ onCreate }) => {
	const [state, setState] = useState({
		name: '',
		description: '',
		file: ''
	});
	const [file, setFile] = useState({
		file: null,
		signedRequest: null,
		signedUrl: null
	});

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		name: '',
		description: '',
		file: ''
	});

	const onFileSelect = (status, file, signedRequst, signedUrl) => {
		if (status) {
			setErrors({ ...errors, file: '' });
			setState({ ...state, file: signedUrl });
			setFile({
				file: file,
				signedRequest: signedRequst,
				signedUrl: signedUrl
			});
		}
	};

	const validate = () => {
		let isValid = true;
		if (state.name === '') {
			setErrors({ ...errors, name: 'Name is required' });
			isValid = false;
		} else if (state.description === '') {
			setErrors({ ...errors, description: 'Description is required' });
			isValid = false;
		} else if (state.file === '') {
			setErrors({ ...errors, file: 'Template is required' });
			isValid = false;
		}
		return isValid;
	};

	const onChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
		setErrors({ ...errors, [e.target.name]: '' });
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
			const response = await _uploadFile();
			if (!response) {
				toast.error('Error while uploading the file');
				return;
			}
			const create_response = await createTemplate(state);
			if (create_response.status) {
				onCreate(create_response.template);
			} else {
				toast.error(create_response.message);
			}
		}
		setLoading(false);
	};

	return (
		<div className='row'>
			<div className='col-md-12 form-background'>
				<h1>Create Template</h1>
				<form onSubmit={onSubmit}>
					{Object.keys(state).map((key, index) => {
						if (key !== 'file') {
							return (
								<Input
									key={index}
									label={key}
									value={state[key]}
									name={key}
									onChange={onChange}
									isError={!!errors[key]}
									errorMessage={errors[key]}
									placeHolder={key}
								/>
							);
						}
					})}

					<UploadFile
						title='Select template'
						onFileSelect={onFileSelect}
					/>
					{errors.file && (
						<div className='alert alert-danger'>{errors.file}</div>
					)}
					<div className='row'>
						<div className='col-md-12 text-end'>
							<button className='btn btn-primary'>
								{loading ? <Spinner /> : 'Create'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateTemplate;
