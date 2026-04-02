import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthLayout from "@/components/AuthLayout";
import { findUser } from "@/lib/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email."); return; }
    if (!findUser(email)) { toast.error("No account found with this email."); return; }
    toast.success("Reset link sent! Redirecting...");
    setTimeout(() => navigate(`/reset-password?email=${encodeURIComponent(email)}`), 1500);
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email to reset your password.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        <Button type="submit" className="w-full">Send Reset Link</Button>
        <p className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Back to Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
