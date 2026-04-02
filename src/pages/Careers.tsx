import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const careers = [
  { title: "Full Stack Developer", location: "Remote", salary: "$90K–$140K", dept: "Engineering", type: "Full-time" },
  { title: "Data Scientist", location: "New York, NY", salary: "$100K–$160K", dept: "Data", type: "Full-time" },
  { title: "UX Designer", location: "San Francisco, CA", salary: "$85K–$130K", dept: "Design", type: "Full-time" },
  { title: "Course Content Writer", location: "Remote", salary: "$60K–$90K", dept: "Content", type: "Contract" },
  { title: "Marketing Manager", location: "Austin, TX", salary: "$75K–$110K", dept: "Marketing", type: "Full-time" },
  { title: "DevOps Engineer", location: "Remote", salary: "$95K–$150K", dept: "Engineering", type: "Full-time" },
];

export default function Careers() {
  return (
    <div className="container py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4">Explore <span className="gradient-text">Careers</span></h1>
        <p className="text-muted-foreground max-w-md mx-auto">Join our team and help shape the future of education.</p>
      </motion.div>
      <div className="grid gap-4 max-w-3xl mx-auto">
        {careers.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-semibold">{c.title}</h3>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{c.dept} · {c.type}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{c.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{c.salary}</span>
              </div>
            </div>
            <Button size="sm">Apply Now</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
