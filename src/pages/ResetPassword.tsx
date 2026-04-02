import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthLayout from "@/components/AuthLayout";
import { updateUserPassword } from "@/lib/auth";
import { getPasswordStrength } from "@/lib/password";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    if (password !== confirm) { toast.error("Passwords don't match."); return; }
    updateUserPassword(email, password);
    toast.success("Password reset successfully! Please login.");
    navigate("/login");
  };

  const inputClass = "px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <AuthLayout title="Reset Password" subtitle={`Set a new password for ${email}`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPw ? "text" : "password"} placeholder="New password" className={`w-full ${inputClass} pr-10`} />
          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
        </div>
        {password && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: `${(strength.score / 5) * 100}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">{strength.label}</span>
          </div>
        )}
        <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="Confirm new password" className={inputClass} />
        <Button type="submit" className="w-full">Reset Password</Button>
        <p className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Back to Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
