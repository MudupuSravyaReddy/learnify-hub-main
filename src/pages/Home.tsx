import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Award, Users, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/lib/courses";

const stats = [
  { icon: BookOpen, label: "Courses", value: "500+" },
  { icon: Users, label: "Students", value: "50K+" },
  { icon: Award, label: "Certifications", value: "120+" },
  { icon: TrendingUp, label: "Success Rate", value: "95%" },
];

const banners = [
  {
    title: "🔥 Limited Time Offer",
    description: "Get 30% off on all premium courses",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-600",
    textColor: "text-white"
  },
  {
    title: "🎯 New Course Launch",
    description: "Advanced React & TypeScript Masterclass",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-600",
    textColor: "text-white"
  },
  {
    title: "🏆 Student Success",
    description: "Join 50,000+ successful learners worldwide",
    bgColor: "bg-gradient-to-r from-blue-500 to-cyan-600",
    textColor: "text-white"
  }
];

export default function Home() {
  const [params] = useSearchParams();
  const q = params.get("q");

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(0,0%,100%,0.1),transparent_60%)]" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6"
            >
              Unlock Your Potential with Expert-Led Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-primary-foreground/80 mb-8 max-w-lg"
            >
              Join thousands of learners mastering new skills through our curated, industry-relevant programs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <Link to="/courses">Explore Courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Banners */}
      <section className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`${banner.bgColor} rounded-xl p-6 text-white relative overflow-hidden`}
            >
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">{banner.title}</h3>
                <p className="text-sm opacity-90">{banner.description}</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-20">
                <Sparkles className="h-24 w-24" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
              className="glass rounded-xl p-6 text-center"
            >
              <s.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="font-heading text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-3">
            {q ? `Results for "${q}"` : "Featured Courses"}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">Handpicked by our team to accelerate your career growth.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(q
            ? courses.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()) || c.category.toLowerCase().includes(q.toLowerCase()))
            : courses
          ).map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} />
          ))}
        </div>
        {q && courses.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()) || c.category.toLowerCase().includes(q.toLowerCase())).length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No courses found for "{q}".</p>
        )}
      </section>
    </div>
  );
}
