import { Star, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Course } from "@/lib/courses";

export default function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden h-44">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">{course.category}</span>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />{course.rating}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.students.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-primary">${course.price}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{course.level}</span>
        </div>
      </div>
    </motion.div>
  );
}
