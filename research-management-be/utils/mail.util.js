const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const sendMail = async (to, subject, text) => {
	try {
		var transporter = nodemailer.createTransport(
			smtpTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASSWORD
				}
			})
		);
		var mailOptions = {
			from: process.env.EMAIL_USER,
			to: to,
			subject: subject,
			text: text
		};

		await transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
				return {
					status: false,
					message: 'Email sending failed',
					error: error
				};
			} else {
				console.log('Email sent: ' + info.response);
				return {
					status: true,
					message: 'Email sent successfully'
				};
			}
		});
	} catch (error) {
		console.log('error');
		console.log(error);
		return {
			status: false,
			message: 'Emailsending failed',
			error: error
		};
	}
};

exports.sendMail = sendMail;
