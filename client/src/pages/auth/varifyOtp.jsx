import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/auth/verify-otp", { email, otp, newPassword });
            toast({ title: data.message, style: { backgroundColor: data.success ? "white" : "red", color: "black" } });
            if (data.success) navigate("/auth/login");
        } catch (error) {
            toast({ title: "Error resetting password", style: { backgroundColor: "red", color: "white" } });
        }
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <h1 className="text-3xl font-bold">Verify OTP & Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full p-2 border rounded mt-4"
                    required
                />
                <button type="submit" className="w-full bg-primary text-white p-2 mt-4 rounded">Reset Password</button>
            </form>
        </div>
    );
}

export default VerifyOTP;
