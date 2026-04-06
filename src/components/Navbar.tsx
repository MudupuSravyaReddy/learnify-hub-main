import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, GraduationCap, LogOut, User, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/lib/courses";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Careers", to: "/careers" },
  { label: "Certifications", to: "/certifications" },
  { label: "Research", to: "/research" },
  { label: "Shop", to: "/shop" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navigate = useNavigate();
  const user = getCurrentUser();

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search.trim()) {
      const allSuggestions = courses.flatMap(course => [
        course.title,
        course.category,
        course.instructor
      ]);

      const filtered = allSuggestions
        .filter(s => s.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 5);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/courses?q=${encodeURIComponent(search.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    navigate(`/courses?q=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex items-center justify-between h-[var(--nav-height)] gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="font-heading text-xl font-bold gradient-text">LMS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="px-3 py-2 text-sm hover:text-primary">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-3">

          {/* Search */}
          <div ref={searchRef} className="relative">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-4 py-2 rounded-full border text-sm"
              />
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSuggestionClick(s)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AUTH */}
          {user ? (
            <>

              {/* 🛒 Cart Icon */}
              <Link to="/cart">
                <ShoppingCart className="h-6 w-6 cursor-pointer" />
              </Link>

              {/* Profile */}
              <div ref={profileRef} className="relative">
                <button onClick={() => setProfileDropdown(!profileDropdown)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">

                    {/* User Info */}
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    {/* 📦 My Orders */}
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setProfileDropdown(false)}
                    >
                      My Orders
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild><Link to="/login">Login</Link></Button>
              <Button size="sm" asChild><Link to="/register">Sign Up</Link></Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
