const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../../models/User'); // User model
const bcrypt = require('bcryptjs');

const otpStore = new Map(); // Store OTP temporarily (Use Redis in production)

const sendOTP = async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

        console.log(`Generated OTP: ${otp} for ${email}`);  // Debugging

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // Update this
                pass: 'your-email-password'  // Use an App Password!
            }
        });

        // Send Email
        await transporter.sendMail({
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        });

        console.log(`OTP sent successfully to ${email}`);
        res.json({ success: true, message: "OTP sent to email!" });

    } catch (error) {
        console.error("Error sending OTP:", error);  // Log the real error
        res.status(500).json({ success: false, message: "Error sending OTP!", error: error.message });
    }
};


const verifyOTP = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        if (!otpStore.has(email)) {
            return res.json({ success: false, message: "OTP expired or invalid!" });
        }

        const storedData = otpStore.get(email);
        if (storedData.otp !== otp) {
            return res.json({ success: false, message: "Incorrect OTP!" });
        }

        // Hash new password
        const hashPassword = await bcrypt.hash(newPassword, 12);

        // Update user password
        await User.updateOne({ email }, { $set: { password: hashPassword } });

        otpStore.delete(email); // Remove OTP after successful password reset

        res.json({ success: true, message: "Password reset successful!" });

    } catch (error) {
        console.error("Error resetting password:", error);
        res.json({ success: false, message: "Error resetting password!" });
    }
};

module.exports = { sendOTP, verifyOTP };

