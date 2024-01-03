import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

export const SendEmail = (facultyemail, password, name) => {
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
			intro: `Your credential has been added to our System. Keep your credentials safe!<br><br>Email: ${facultyemail}<br>Password: ${password}. <br><br> There is Feedback in the system! your fedback there can help to optimize the website and any thing which in your point will really appreciated. <br> Note:  Feedback in completely anonymous. <br><br>`,
			action: {
				instructions: 'Please click the button below to Login to your account:',
				button: {
					color: '#22BC66',
					text: 'Open App',
					link: 'https://www.ffsboyswah.com/login',
				},
			},
			outro: 'If you need any help or have questions, please reach out to us at email (principal@ffsboyswah.com). We\'d love to help.<br>Secondly, a YouTube video is attached to complete the onboarding process <a href="https://www.youtube.com/watch?v=SumpypYEV60">https://www.youtube.com/watch?v=SumpypYEV60</a>.',
		},
	};

	const emailBody = mailGenerator.generate(email);

	const mailOptions = {
		from: 'principal@ffsboyswah.com',
		to: facultyemail,
		subject: 'Invitation for Onboarding at FFS BOYS WAH Application',
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
