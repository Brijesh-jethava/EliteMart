import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const { toast } = useToast();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
            console.log("Server Response:", data);
            toast({
                title: data.message,
                style: { backgroundColor: data.success ? "white" : "red", color: "black" }
            });
            if (data.success) navigate("/auth/verify-otp", { state: { email } });
        } catch (error) {
            console.error("Error sending OTP:", error.response?.data || error.message);
            toast({
                title: error.response?.data?.message || "Error sending OTP",
                description: error.response?.data?.error || "An unexpected error occurred.",
                style: { backgroundColor: "red", color: "white" }
            });
        }
    }
    

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-black text-white p-2 mt-4 rounded">Send OTP</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
