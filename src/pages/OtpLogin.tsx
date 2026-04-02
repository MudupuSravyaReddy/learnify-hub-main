import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthLayout from "@/components/AuthLayout";
import { findUser, setCurrentUser } from "@/lib/auth";

const FIXED_OTP = "778064";

export default function OtpLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const sendOtp = useCallback(() => {
    if (!email) { toast.error("Enter your email first."); return; }
    const user = findUser(email);
    if (!user) { toast.error("No account found with this email."); return; }
    setSent(true);
    setTimer(30);
    toast.success("OTP sent to your email! (Use: 778064)");
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== FIXED_OTP) { toast.error("Invalid OTP. Please try again."); return; }
    const user = findUser(email);
    if (!user) return;
    const { password: _, ...safe } = user;
    setCurrentUser(safe);
    toast.success(`Welcome back, ${user.firstName}!`);
    navigate("/");
  };

  const inputClass = "px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <AuthLayout title="OTP Login" subtitle="We'll send a one-time password to your email.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className={inputClass} disabled={sent} />
        {!sent ? (
          <Button type="button" onClick={sendOtp} className="w-full">Send OTP</Button>
        ) : (
          <>
            <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="Enter 6-digit OTP" maxLength={6} className={`${inputClass} text-center tracking-[0.3em] text-lg font-mono`} />
            <Button type="submit" className="w-full">Verify & Login</Button>
            <div className="text-center text-sm text-muted-foreground">
              {timer > 0 ? `Resend in ${timer}s` : <button type="button" onClick={sendOtp} className="text-primary hover:underline">Resend OTP</button>}
            </div>
          </>
        )}
        <p className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Back to Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
