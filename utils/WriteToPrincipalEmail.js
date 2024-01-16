import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

export const SendPrinicpalEmail = (name, emailId, mobile, className, message) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.zoho.com',
		port: 465,
		secure: true,
		auth: {
			user: 'principal@ffsboyswah.com',
			pass: process.env.ApplicationPassword,
		},
	});
	const mailGenerator = new Mailgen({
		theme: 'default',
		product: {
			name: 'Principal FFS BOYS WAH',
			link: 'www.ffsboyswah.com',
		},
		header: {
			title: 'Yours truly',
			imageUrl: 'https://example.com/logo.png', // Replace with your logo image URL
		},
		footer: {
			name: "Hiii",
			title: 'Principal FFS BOYS WAH',
			imageUrl: 'https://example.com/signature.png', // Replace with your signature image URL
		},
	});

	const email = {
		body: {
			name: name,
			intro: `Principal Response is recording in the system. <br><br> Name: ${name} <br> Email: ${emailId} <br> Mobile Number: ${mobile} <br> Class: ${className} <br> Message: ${message}<br><br>`,
			action: {
				instructions: 'Please click the button below to Login to your account and view the status of all the response:',
				button: {
					color: '#22BC66',
					text: 'Open App',
					link: 'https://www.ffsboyswah.com/login',
				},
			},
		},
	};

	const emailBody = mailGenerator.generate(email);

	const mailOptions = {
		from: 'principal@ffsboyswah.com',
		to: 'principal@ffsboyswah.com',
		subject: 'SomeBody has write to you FFS BOYS WAH',
		html: emailBody,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent successfully:', info.response);
		}
	});
};
