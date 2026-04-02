import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthLayout from "@/components/AuthLayout";
import { findUser, saveUser, setCurrentUser } from "@/lib/auth";
import { Eye, EyeOff, Camera, Check, Circle } from "lucide-react";

const countries = ["India", "USA", "Canada", "UK", "Australia", "Germany"];
const states = ["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Maharashtra", "Kerala"];

function evaluateStrength(pwd: string) {
  const reqs = {
    length8: pwd.length >= 8,
    lowercase: /[a-z]/.test(pwd),
    uppercase: /[A-Z]/.test(pwd),
    number: /\d/.test(pwd),
    special: /[^a-zA-Z0-9]/.test(pwd),
  };
  let score = 0;
  if (reqs.length8) score++;
  if (reqs.lowercase) score++;
  if (reqs.uppercase) score++;
  if (reqs.number) score++;
  if (reqs.special) score++;

  let label = "Weak";
  let color = "bg-destructive";
  if (score >= 5) { label = "Strong"; color = "bg-green-500"; }
  else if (score >= 3) { label = "Medium"; color = "bg-yellow-400"; }

  return { score, label, color, reqs };
}

export default function Register() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: "",
    mobile: "", dob: "", city: "", state: "", country: "", preferredLanguage: "",
    organization: "", skills: "", fieldOfStudy: "", highestQualification: "",
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const strength = evaluateStrength(form.password);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Image should be under 5MB"); return; }
    setPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password || !form.confirm) {
      toast.error("Please fill all required fields (name, email, password)."); return;
    }
    if (form.password !== form.confirm) { toast.error("Passwords don't match."); return; }
    if (strength.score < 3) { toast.error("Please use a stronger password (at least Medium)."); return; }
    if (findUser(form.email)) { toast.error("Email already registered."); return; }

    const user = {
      id: crypto.randomUUID(),
      firstName: form.firstName, lastName: form.lastName, email: form.email,
      phone: form.mobile, profession: form.organization, password: form.password,
      avatar: photo || undefined,
    };
    saveUser(user);
    const { password: _, ...safe } = user;
    setCurrentUser(safe);
    toast.success("Registration Successful!");
    navigate("/");
  };

  const inputClass = "px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";
  const selectClass = `${inputClass} w-full appearance-none`;

  return (
    <AuthLayout title="Create Account" subtitle="Join us today with full profile">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Avatar upload */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <label className="relative cursor-pointer group">
            <div className="w-20 h-20 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
              {photo ? (
                <img src={photo} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
              <Camera className="h-3 w-3" />
            </div>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
          <span className="text-xs text-muted-foreground">Click avatar to upload</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input value={form.firstName} onChange={set("firstName")} placeholder="First name *" className={inputClass} />
          <input value={form.lastName} onChange={set("lastName")} placeholder="Last name *" className={inputClass} />
        </div>
        <input value={form.email} onChange={set("email")} type="email" placeholder="Email address *" className={inputClass} />

        {/* Password with strength meter */}
        <div className="relative">
          <input value={form.password} onChange={set("password")} type={showPw ? "text" : "password"} placeholder="Password *" className={`w-full ${inputClass} pr-10`} />
          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {form.password && (
          <>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: `${(strength.score / 5) * 100}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{strength.label}</span>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
              <p className="text-xs font-medium text-muted-foreground mb-1">Password must contain:</p>
              {[
                { key: "length8", label: "At least 8 characters" },
                { key: "lowercase", label: "Lowercase letter" },
                { key: "uppercase", label: "Uppercase letter" },
                { key: "number", label: "Number" },
                { key: "special", label: "Special character (e.g., !@#$%)" },
              ].map((r) => (
                <div key={r.key} className={`flex items-center gap-1.5 text-xs transition-colors ${(strength.reqs as any)[r.key] ? "text-green-600" : "text-muted-foreground"}`}>
                  {(strength.reqs as any)[r.key] ? <Check className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                  {r.label}
                </div>
              ))}
            </div>
          </>
        )}

        <input value={form.confirm} onChange={set("confirm")} type="password" placeholder="Confirm password *" className={inputClass} />
        <input value={form.mobile} onChange={set("mobile")} placeholder="Mobile number *" className={inputClass} />
        <input value={form.dob} onChange={set("dob")} type="date" placeholder="Date of birth *" className={inputClass} />
        <input value={form.city} onChange={set("city")} placeholder="City *" className={inputClass} />

        <select value={form.country} onChange={set("country")} className={selectClass}>
          <option value="">Select Country *</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={form.state} onChange={set("state")} className={selectClass}>
          <option value="">Select State *</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <input value={form.preferredLanguage} onChange={set("preferredLanguage")} placeholder="Preferred Language *" className={inputClass} />

        <div className="border-t border-border pt-3 mt-1">
          <p className="text-xs font-medium text-muted-foreground mb-2">Professional Info (Optional)</p>
          <div className="flex flex-col gap-3">
            <input value={form.organization} onChange={set("organization")} placeholder="Organization" className={inputClass} />
            <input value={form.skills} onChange={set("skills")} placeholder="Skills (comma separated)" className={inputClass} />
            <input value={form.fieldOfStudy} onChange={set("fieldOfStudy")} placeholder="Field of Study" className={inputClass} />
            <input value={form.highestQualification} onChange={set("highestQualification")} placeholder="Highest Qualification" className={inputClass} />
          </div>
        </div>

        <Button type="submit" className="w-full mt-1">Register</Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
