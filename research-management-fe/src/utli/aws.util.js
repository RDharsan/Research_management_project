import axios from 'axios';
import { getToken } from './auth.util';

// get signed url for uploading file
export const getSignedUrl = async (fileName, fileType) => {
	const token = getToken();
	try {
		const response = await axios.get(
			`/api/aws/signed?filename=${fileName}&filetype=${fileType}`,
			{
				headers: {
					authorization: `${token}`
				}
			}
		);

		if (response.status === 200) {
			return {
				status: true,
				signedUrl: response.data.url,
				signedRequest: response.data.signedRequest
			};
		}
		return { status: false, message: 'Error getting signed url' };
	} catch (error) {
		return { status: false, message: 'Error getting signed url' };
	}
};

//upload file
export const uploadFile = async (file, signedRequest) => {
	try {
		return new Promise(function (resolve, reject) {
			const xhr = new XMLHttpRequest();
			xhr.open('PUT', signedRequest);
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve({
							status: true,
							message: 'File uploaded successfully'
						});
					} else {
						reject({
							status: false,
							message: 'Error uploading file'
						});
					}
				}
			};
			xhr.send(file);
		});
	} catch (error) {
		return { status: false, message: 'Error uploading file' };
	}
};
