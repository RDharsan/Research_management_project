const aws = require('aws-sdk');

aws.config.region = process.env.REGION;
/*
 * Load the S3 information from the environment variables.
 */
const S3_BUCKET = process.env.S3_BUCKET;

const getSigendURL = async (req, res, next) => {
	try {
		const s3 = new aws.S3({
			signatureVersion: 'v4'
		});
		const fileName = req.query.filename;
		const fileType = req.query.filetype;
		console.log(`name ${fileName} type ${fileType}`);
		const s3Params = {
			Bucket: S3_BUCKET,
			Key: fileName.replace(/\s/g, ''),
			Expires: 60,
			ContentType: fileType
		};
		s3.getSignedUrl('putObject', s3Params, (err, data) => {
			if (err) {
				console.log(err);
				return res.end();
			}
			const returnData = {
				signedRequest: data,
				url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName.replace(
					/\s/g,
					''
				)}`
			};

			res.write(JSON.stringify(returnData));
			res.end();
		});
	} catch (err) {
		console.error('server error' + err.message);
		return res.status(500).json({ message: 'server error', error: err });
	}
};

exports.getSigendURL = getSigendURL;
