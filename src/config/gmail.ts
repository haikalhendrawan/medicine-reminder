import nodemailer from 'nodemailer';


const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASSWORD; 


export const checkNodemailerCredentials = () => {
    if (!GMAIL_USER || !GMAIL_PASS) {
        console.error("❌ ERROR: Nodemailer credentials are NOT set. Email service will be disabled.");
        console.error("Please ensure GMAIL_APP_EMAIL and GMAIL_APP_PASS are configured in your .env file.");
        return false;
    }
    return true;
};

// Setup Nodemailer Transporter
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});