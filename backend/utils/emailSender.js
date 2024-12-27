const transporter = require('../config/email');

/**
 * Send email
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 */
async function sendEmail(to, subject, html) {
    try {
        const info = await transporter.sendMail({
            from: '"My App" denispopov2112@gmail.com',
            to,
            subject,
            html,
        });
        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error(`Failed to send email: ${error.message}`);
    }
}

module.exports = { sendEmail };