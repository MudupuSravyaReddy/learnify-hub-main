import { motion } from "framer-motion";
import { Target, Eye, Users, Award } from "lucide-react";

const values = [
  { icon: Target, title: "Our Mission", desc: "To democratize education by providing accessible, high-quality learning experiences for everyone." },
  { icon: Eye, title: "Our Vision", desc: "A world where anyone can learn anything, anywhere, and transform their career and life." },
  { icon: Users, title: "Community", desc: "Over 50,000 learners and 500 expert instructors collaborating across the globe." },
  { icon: Award, title: "Excellence", desc: "Industry-recognized certifications with a 95% employer satisfaction rate." },
];

export default function About() {
  return (
    <div className="container py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-heading font-bold mb-4">About <span className="gradient-text">LMS</span></h1>
        <p className="text-muted-foreground text-lg">We're on a mission to transform education through technology, making world-class learning accessible to all.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {values.map((v, i) => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-8">
            <v.icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">{v.title}</h3>
            <p className="text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="hero-gradient rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">Ready to Start Learning?</h2>
        <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">Join our community and take the first step towards your new career.</p>
      </div>
    </div>
  );
}
