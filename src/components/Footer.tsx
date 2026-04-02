import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-lg gradient-text">LMS</span>
          </div>
          <p className="text-sm text-muted-foreground">Empowering learners worldwide with cutting-edge courses and certifications.</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <Link to="/certifications" className="hover:text-primary transition-colors">Certifications</Link>
            <Link to="/careers" className="hover:text-primary transition-colors">Careers</Link>
            <Link to="/research" className="hover:text-primary transition-colors">Research</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Company</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Stay Connected</h4>
          <p className="text-sm text-muted-foreground mb-3">Subscribe to our newsletter for updates.</p>
          <div className="flex">
            <input placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            <button className="px-4 py-2 rounded-r-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LMS. All rights reserved.
      </div>
    </footer>
  );
}
