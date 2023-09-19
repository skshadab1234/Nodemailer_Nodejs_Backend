const express = require('express');
const sendEmail = require('./nodemailer')

const fs = require('fs/promises'); // For reading the HTML template

const app = express();

app.post("/signup", async (req, res) => {
    try {
        const toEmail = 'pwscoding@gmail.com'; // Replace with the user's email address
        const subject = 'Email Verification';

        // Read the HTML template
        const htmlTemplate = await fs.readFile('verification_email_template.html', 'utf-8');

        const min = 1000;
        const max = 9999;
        const verification_code = Math.floor(Math.random() * (max - min + 1)) + min;

        // Replace placeholders with actual values
        const user_name = 'Khan Shadab'; // Replace with the user's name


        const htmlContent = htmlTemplate
            .replace(/\[user_name\]/g, user_name)
            .replace(/\[verification_code\]/g, verification_code);

        // Send the email
        await sendEmail(toEmail, subject, htmlContent);

        return res.status(201).json({
            msg: "A verification email has been sent. Please check your inbox."
        });
    } catch (error) {
        console.error('Error sending verification email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3001, () => {
    console.log('Server is Running on PORT 3001');
});

// Define the sendEmail function here (either as in the previous response or from your external file)
