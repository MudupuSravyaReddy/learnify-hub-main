import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient items-center justify-center p-12">
        <div className="text-center max-w-md">
          <GraduationCap className="h-16 w-16 mx-auto mb-6 text-primary-foreground animate-float" />
          <h1 className="text-4xl font-heading font-bold text-primary-foreground mb-4">Welcome to LMS</h1>
          <p className="text-primary-foreground/80 text-lg">Unlock your potential with world-class courses and expert instructors.</p>
        </div>
      </div>
      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-heading text-xl font-bold gradient-text">LMS</span>
          </Link>
          <h2 className="text-2xl font-heading font-bold mb-1">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
