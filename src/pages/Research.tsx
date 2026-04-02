import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const papers = [
  { title: "The Impact of AI on Personalized Learning Pathways", authors: "Dr. Sarah Chen, Prof. James Wilson", year: 2024, field: "EdTech" },
  { title: "Gamification Strategies in Online Education", authors: "Maria Rodriguez, Alex Thompson", year: 2024, field: "Pedagogy" },
  { title: "Microlearning: Effectiveness of Bite-sized Content", authors: "Kim Park, Lisa Brown", year: 2023, field: "Curriculum" },
  { title: "Blockchain Credentials for Digital Certifications", authors: "Nina Patel, Dr. Mark Evans", year: 2023, field: "Technology" },
  { title: "Adaptive Assessment Models in MOOCs", authors: "Dr. Sarah Chen", year: 2023, field: "Assessment" },
];

export default function Research() {
  return (
    <div className="container py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4"><span className="gradient-text">Research</span></h1>
        <p className="text-muted-foreground max-w-md mx-auto">Pioneering research in education technology and learning science.</p>
      </motion.div>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {papers.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-6 flex items-start gap-4">
            <FileText className="h-8 w-8 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-heading font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.authors} · {p.year}</p>
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{p.field}</span>
            </div>
            <Button size="sm" variant="ghost"><ExternalLink className="h-4 w-4" /></Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
