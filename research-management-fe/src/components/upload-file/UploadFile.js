import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getSignedUrl } from '../../utli/aws.util';

const UploadFile = ({ title, acceptedTypes, onFileSelect }) => {
	const getSignedUrlRequest = async (file) => {
		const response = await getSignedUrl(file.name, file.type);
		if (response.status) {
			onFileSelect(
				true,
				file,
				response.signedRequest,
				response.signedUrl
			);
		} else {
			toast.error('Error uploading file');
			onFileSelect(false, file, null);
		}
	};
	const onChange = (e) => {
		if (e.target.files[0]) {
			getSignedUrlRequest(e.target.files[0]);
		}
	};
	return (
		<div className='mb-3'>
			<label htmlFor='formFileSm' className='form-label'>
				{title || 'Upload file'}
			</label>
			<input
				className='form-control form-control-md'
				id='formFileSm'
				type='file'
				accept={acceptedTypes}
				onChange={onChange}
			/>
		</div>
	);
};

export default UploadFile;
