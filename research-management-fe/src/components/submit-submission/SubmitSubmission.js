import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFile } from '../../utli/aws.util';
import { createSubmission } from '../../utli/submission.utli';
import { Spinner } from '../loading/Loading';
import UploadFile from '../upload-file/UploadFile';

const SubmitSubmission = ({
	fileTypes,
	submissionTypeID,
	groupID,
	onSubmission
}) => {
	const [file, setFile] = useState({
		file: null,
		signedRequest: null,
		signedUrl: null
	});
	const [loading, setLoading] = useState(false);

	const onFileSelect = (status, file, signedRequst, signedUrl) => {
		if (status) {
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
		if (!file.signedUrl) {
			toast.error('Please select a file to upload');
			return;
		}
		const isUploaded = await _uploadFile();
		if (!isUploaded) {
			toast.error('Error uploading file');
			return;
		}
		const create_response = await createSubmission({
			submissionType: submissionTypeID,
			studentGroup: groupID,
			files: [file.signedUrl]
		});
		if (create_response.status) {
			toast.success('Submission created successfully');
			onSubmission(create_response.submission);
		} else {
			toast.error('Error creating submission');
		}
	};
	return (
		<div className='row'>
			<div className='col-md-12'>
				<h4>Make a submission</h4>
			</div>
			<form onSubmit={onSubmit}>
				<UploadFile
					fileTypes={fileTypes}
					acceptedTypes={fileTypes}
					onFileSelect={onFileSelect}
					title='Select a file to upload'
				/>
				<div className='row'>
					<div className='col-md-12 text-end'>
						<button className='btn btn-primary'>
							{loading ? <Spinner /> : 'Submit'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SubmitSubmission;
