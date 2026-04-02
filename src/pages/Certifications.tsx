import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const certs = [
  { title: "Full Stack Web Development", duration: "6 months", modules: 12, skills: ["React", "Node.js", "PostgreSQL", "TypeScript"] },
  { title: "Data Science Professional", duration: "8 months", modules: 16, skills: ["Python", "Machine Learning", "Deep Learning", "Statistics"] },
  { title: "Cloud Architecture (AWS)", duration: "4 months", modules: 8, skills: ["EC2", "S3", "Lambda", "CloudFormation"] },
  { title: "Cybersecurity Analyst", duration: "5 months", modules: 10, skills: ["Network Security", "Ethical Hacking", "SIEM", "Incident Response"] },
  { title: "UI/UX Design Professional", duration: "4 months", modules: 8, skills: ["Figma", "User Research", "Prototyping", "Design Systems"] },
  { title: "Digital Marketing", duration: "3 months", modules: 6, skills: ["SEO", "Google Ads", "Social Media", "Analytics"] },
];

export default function Certifications() {
  return (
    <div className="container py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4"><span className="gradient-text">Certifications</span></h1>
        <p className="text-muted-foreground max-w-md mx-auto">Earn industry-recognized credentials that boost your career.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-6 flex flex-col">
            <Award className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{c.duration} · {c.modules} modules</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {c.skills.map((s) => (
                <span key={s} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  <CheckCircle className="h-3 w-3 text-secondary" />{s}
                </span>
              ))}
            </div>
            <Button className="mt-auto" variant="outline" size="sm">Learn More</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
